"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { FloatingHearts } from "@/components/effects/FloatingHearts";

interface StepShellProps {
  title: string;
  subtitle?: string;
  stepIndex: number; // 0-indexed among the 5 question steps
  totalSteps: number;
  children: ReactNode;
}

export function StepShell({
  title,
  subtitle,
  stepIndex,
  totalSteps,
  children,
}: StepShellProps) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-blush-radial px-4 py-12 sm:px-6">
      <FloatingHearts count={8} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -28 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl"
      >
        <ProgressDots total={totalSteps} current={stepIndex} className="mb-6" />

        <div className="glass-card rounded-5xl p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-plum-600 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-plum-400 sm:text-base">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
