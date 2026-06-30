"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed
  className?: string;
}

/** Small romantic progress indicator (heart-shaped dots) for the multi-step flow. */
export function ProgressDots({ total, current, className }: ProgressDotsProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            scale: i === current ? 1.3 : 1,
            opacity: i <= current ? 1 : 0.35,
          }}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            i <= current ? "bg-[#ff003c] shadow-[0_0_8px_#ff3366]" : "bg-white/20"
          )}
        />
      ))}
    </div>
  );
}
