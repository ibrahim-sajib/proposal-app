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
          ? "border-rose-500 bg-rose-50/70 shadow-glow"
          : "border-transparent hover:border-rose-200"
      )}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white shadow-glow"
        >
          <Check size={16} strokeWidth={3} />
        </motion.span>
      )}
      <span className="text-4xl sm:text-5xl">{emoji}</span>
      <span className="font-display text-base sm:text-lg font-semibold text-plum-600">
        {label}
      </span>
      {description && (
        <span className="text-xs text-plum-400 sm:text-sm">{description}</span>
      )}
    </motion.button>
  );
}
