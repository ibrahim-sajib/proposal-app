"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface LongMessageStepProps {
  onContinue: () => void;
}

export function LongMessageStep({ onContinue }: LongMessageStepProps) {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -45, scale: 0.95 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-xl p-8 sm:p-12 text-center flex flex-col items-center gap-8 border border-white/20 shadow-[0_0_40px_rgba(255,0,60,0.25)]"
      >
        <p className="font-display text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Marrying you was the best decision I have ever made. You're not only the love of my life, but also my best
          friend, my greatest comfort, and the place my heart will always call home. I know we've already created
          countless beautiful memories together, but I believe our best ones are still waiting for us. So... let's make
          another unforgettable memory, just you and me.
        </p>

        <Button variant="primary" size="lg" onClick={onContinue} className="px-8 py-4 font-bold text-lg rounded-full">
          Let's Make Another Memory ❤️
        </Button>
      </motion.div>
    </div>
  );
}
