"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { randomInt } from "@/lib/utils";

interface SparklesProps {
  count?: number;
  className?: string;
}

/** Twinkling sparkle particles for a magical atmosphere. Purely decorative. */
export function Sparkles({ count = 18, className = "" }: SparklesProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: randomInt(0, 100),
        left: randomInt(0, 100),
        delay: randomInt(0, 30) / 10,
        size: randomInt(3, 9),
      })),
    [count]
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.9)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
          transition={{
            duration: 1.8,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: randomInt(1, 4),
          }}
        />
      ))}
    </div>
  );
}
