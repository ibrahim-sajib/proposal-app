"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

/** Brief romantic loading animation shown while the experience initializes. */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-sunset-gradient">
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-12 w-12 fill-white text-white" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="font-display text-lg font-medium text-white"
      >
        Loading our story...
      </motion.p>
    </div>
  );
}
