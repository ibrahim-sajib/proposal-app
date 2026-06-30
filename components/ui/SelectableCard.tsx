"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  emoji: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}

/** A tappable card used for picking a place or a food item, with a clear selected state. */
export function SelectableCard({
  emoji,
  label,
  description,
  selected,
  onSelect,
}: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-3xl p-5 text-center glass-card transition-colors",
        "border-2",
        selected
          ? "border-[#ff3366] bg-[#ff003c]/20 shadow-[0_0_20px_rgba(255,0,60,0.5)] text-white"
          : "border-transparent hover:border-white/20 text-white/80"
      )}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-[#ff003c] text-white shadow-[0_0_10px_#ff3366]"
        >
          <Check size={16} strokeWidth={3} />
        </motion.span>
      )}
      <span className="text-4xl sm:text-5xl">{emoji}</span>
      <span className="font-display text-base sm:text-lg font-semibold text-white">
        {label}
      </span>
      {description && (
        <span className="text-xs text-white/60 sm:text-sm">{description}</span>
      )}
    </motion.button>
  );
}
