"use client";

import { AnimatePresence, motion } from "framer-motion";

interface EscapeToastProps {
  message: string | null;
  toastKey: number;
}

/** Shows a brief playful message each time the NO button escapes the cursor/touch. */
export function EscapeToast({ message, toastKey }: EscapeToastProps) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-6 z-[70] flex justify-center px-4"
    >
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={toastKey}
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card rounded-full px-5 py-2 text-sm font-semibold text-plum-600 shadow-glow sm:text-base"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
