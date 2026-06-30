"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { randomInt, randomItem } from "@/lib/utils";
import { NO_ESCAPE_MESSAGES } from "@/constants";

interface DodgingNoButtonProps {
  onEscape?: (message: string) => void;
}

const DODGE_RADIUS = 140; // px — how close the cursor must get to trigger a dodge
const BUTTON_W = 140;
const BUTTON_H = 56;
const MARGIN = 16;

/**
 * The NO button. It physically cannot be clicked: it dodges the cursor on desktop
 * and jumps away on touch on mobile, always staying fully inside the viewport.
 */
export function DodgingNoButton({ onEscape }: DodgingNoButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const lastDodge = useRef(0);

  const getBounds = useCallback(() => {
    if (typeof window === "undefined") return { w: 0, h: 0 };
    return { w: window.innerWidth, h: window.innerHeight };
  }, []);

  const dodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge.current < 220) return; // throttle so it doesn't vibrate
    lastDodge.current = now;

    const { w, h } = getBounds();
    if (!w || !h) return;

    const maxX = Math.max(MARGIN, w - BUTTON_W - MARGIN);
    const maxY = Math.max(MARGIN, h - BUTTON_H - MARGIN);
    const x = randomInt(MARGIN, maxX);
    const y = randomInt(MARGIN, maxY);
    setPos({ x, y });
    onEscape?.(randomItem(NO_ESCAPE_MESSAGES));
  }, [getBounds, onEscape]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < DODGE_RADIUS) {
        dodge();
      }
    },
    [dodge]
  );

  // Initialize position once we know the viewport (so first dodge isn't jarring)
  const style = pos
    ? ({
        position: "fixed" as const,
        left: pos.x,
        top: pos.y,
      })
    : undefined;

  return (
    <motion.div
      ref={containerRef}
      style={style}
      animate={
        pos
          ? { x: 0, y: 0, scale: [1, 1.15, 0.95, 1] }
          : { scale: [1, 1.06, 1] }
      }
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={dodge}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      className={pos ? "z-[60]" : "relative"}
    >
      <button
        type="button"
        aria-label="No (this button playfully avoids being clicked)"
        tabIndex={-1}
        onClick={(e) => {
          e.preventDefault();
          dodge();
        }}
        onFocus={dodge}
        className="h-14 w-[140px] select-none rounded-full border-2 border-rose-300/70 bg-white/70 text-lg font-semibold text-plum-500 shadow-glass backdrop-blur-xl"
      >
        NO 💔
      </button>
    </motion.div>
  );
}
