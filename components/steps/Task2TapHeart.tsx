"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Task2TapHeartProps {
  onComplete: () => void;
  onHeartTap: (x: number, y: number) => void;
}

export function Task2TapHeart({ onComplete, onHeartTap }: Task2TapHeartProps) {
  const [clicks, setClicks] = useState(0);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    // Call callback to trigger canvas particles at click coordinates
    onHeartTap(e.clientX, e.clientY);

    if (nextClicks === 5) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-light text-white mb-16 drop-shadow-[0_0_15px_#ff3366] pointer-events-none"
      >
        Tap to fill my heart with love
      </motion.h2>

      <div className="h-64 flex items-center justify-center">
        <motion.div
          id="giant-heart"
          className="giant-heart cursor-pointer relative"
          onClick={handleTap}
          animate={{
            scale: 1 + clicks * 0.3,
          }}
          whileTap={{ scale: (1 + clicks * 0.3) * 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{ width: "100px", height: "90px" }}
        />
      </div>
    </div>
  );
}
