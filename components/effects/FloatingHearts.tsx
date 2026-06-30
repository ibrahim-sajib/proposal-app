"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { HEART_EMOJIS } from "@/constants";
import { randomInt, randomItem } from "@/lib/utils";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

/** Ambient, decorative floating hearts drifting up the background. Purely visual — aria-hidden. */
export function FloatingHearts({ count = 14, className = "" }: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: randomInt(2, 96),
        size: randomInt(14, 34),
        delay: randomInt(0, 8),
        duration: randomInt(10, 18),
        emoji: randomItem(HEART_EMOJIS),
        drift: randomInt(-40, 40),
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none opacity-70"
          style={{ left: `${h.left}%`, fontSize: h.size, bottom: -60 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, h.drift, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}
