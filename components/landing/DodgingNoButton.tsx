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

/**
 * The NO button. It physically cannot be clicked: it dodges the cursor on desktop
 * and jumps away on touch on mobile, always staying fully inside the proposal card.
 */
export function DodgingNoButton({ onEscape }: DodgingNoButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const lastDodge = useRef(0);

  const dodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge.current < 200) return; // throttle so it doesn't vibrate
    lastDodge.current = now;

    const el = containerRef.current;
    if (!el) return;

    const card = el.closest(".glass-card");
    if (!card) return;

    // Trigger romantic blast at the old position
    const rect = el.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("romantic-blast", {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          amount: 5,
          isGold: false,
        },
      })
    );

    const cardRect = card.getBoundingClientRect();

    // Ensure it stays safely inside the card with padding
    const paddingX = 20;
    const paddingY = 20;
    const maxX = Math.max(paddingX, cardRect.width - BUTTON_W - paddingX);
    const maxY = Math.max(paddingY, cardRect.height - BUTTON_H - paddingY);

    const x = randomInt(paddingX, maxX);
    const y = randomInt(paddingY, maxY);

    setPos({ x, y });
    onEscape?.(randomItem(NO_ESCAPE_MESSAGES));
  }, [onEscape]);

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

  const style = pos
    ? ({
        position: "absolute" as const,
      })
    : undefined;

  return (
    <motion.div
      ref={containerRef}
      style={style}
      animate={
        pos
          ? { left: pos.x, top: pos.y, scale: [1, 1.15, 0.95, 1] }
          : { scale: [1, 1.06, 1] }
      }
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
        className="h-14 w-[140px] select-none rounded-full border-2 border-white/40 bg-white/10 text-lg font-semibold text-white shadow-glass backdrop-blur-xl hover:bg-white/20 transition-all duration-300"
      >
        No
      </button>
    </motion.div>
  );
}
