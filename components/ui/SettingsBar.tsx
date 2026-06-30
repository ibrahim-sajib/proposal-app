"use client";

import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SettingsBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

/** Fixed top-right control cluster: dark/light theme + background music toggle. */
export function SettingsBar({
  isDark,
  onToggleTheme,
  isMusicPlaying,
  onToggleMusic,
}: SettingsBarProps) {
  return (
    <div className="fixed right-4 top-4 z-[90] flex gap-2 sm:right-6 sm:top-6">
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={onToggleMusic}
        aria-label={isMusicPlaying ? "Mute background music" : "Play background music"}
        aria-pressed={isMusicPlaying}
        className="glass-card grid h-10 w-10 place-items-center rounded-full text-plum-600 dark:text-cream"
      >
        {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={isDark}
        className="glass-card grid h-10 w-10 place-items-center rounded-full text-plum-600 dark:text-cream"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>
    </div>
  );
}
