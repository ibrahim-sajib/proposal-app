"use client";

import { motion } from "framer-motion";

interface Task1CatchHeartsProps {
  score: number;
}

export function Task1CatchHearts({ score }: Task1CatchHeartsProps) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-start overflow-hidden px-6 pt-24 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card flex flex-col items-center justify-center gap-2 px-8 py-5 border border-white/20 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
      >
        <h2 className="text-lg sm:text-xl font-light text-white/90">
          Catch the golden pieces of my heart:
        </h2>
        <span className="font-display text-4xl sm:text-5xl font-bold text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse-soft">
          {score} <span className="text-2xl text-white/70">/ 3</span>
        </span>
      </motion.div>

      {/* Guide message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-sm sm:text-base font-light text-white/60 max-w-xs leading-relaxed"
      >
        Click or tap on the floating golden hearts in the background!
      </motion.p>
    </div>
  );
}
