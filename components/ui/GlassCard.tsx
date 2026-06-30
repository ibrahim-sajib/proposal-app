"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  as?: never;
}

/** Soft glassmorphism container used across the experience for elevated content. */
export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-4xl p-6 sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
