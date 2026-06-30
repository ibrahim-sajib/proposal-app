"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HEART_EMOJIS } from "@/constants";
import { randomInt, randomItem } from "@/lib/utils";

interface Burst {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  angle: number;
  distance: number;
  size: number;
  emoji: string;
  duration: number;
}

interface HeartExplosionProps {
  /** Bumping this number triggers a new explosion at the given origin (viewport %) */
  trigger: number;
  originX?: number; // 0-100, percentage of viewport width
  originY?: number; // 0-100, percentage of viewport height
  particleCount?: number;
}

/** A radiating burst of heart emojis from a point — used on YES click & "I Love You" button. */
export function HeartExplosion({
  trigger,
  originX = 50,
  originY = 50,
  particleCount = 24,
}: HeartExplosionProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (trigger <= 0) return;
    const id = Date.now();
    setBursts((prev) => [...prev, { id, x: originX, y: originY }]);
    const timeout = setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1800);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <AnimatePresence>
        {bursts.map((burst) => (
          <ExplosionParticles
            key={burst.id}
            x={burst.x}
            y={burst.y}
            count={particleCount}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ExplosionParticles({ x, y, count }: { x: number; y: number; count: number }) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      angle: (360 / count) * i + randomInt(-12, 12),
      distance: randomInt(80, 220),
      size: randomInt(16, 38),
      emoji: randomItem(HEART_EMOJIS),
      duration: randomInt(900, 1500) / 1000,
    }))
  );

  return (
    <>
      {particles.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * p.distance;
        const dy = Math.sin(rad) * p.distance;
        return (
          <motion.span
            key={i}
            className="absolute select-none"
            style={{ left: `${x}%`, top: `${y}%`, fontSize: p.size }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 1.1, rotate: randomInt(-90, 90) }}
            transition={{ duration: p.duration, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.span>
        );
      })}
    </>
  );
}
