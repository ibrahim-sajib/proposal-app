"use client";

import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { StepShell } from "@/components/steps/StepShell";
import { StepNav } from "@/components/steps/StepNav";
import { todayISO, formatFriendlyDate } from "@/lib/utils";

interface DateStepProps {
  value: string | null;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function DateStep({ value, onChange, onBack, onNext }: DateStepProps) {
  return (
    <StepShell
      title="When are we going? ❤️"
      subtitle="Pick a day that's all ours."
      stepIndex={0}
      totalSteps={5}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.label
          htmlFor="date-picker"
          whileHover={{ scale: 1.02 }}
          className="flex w-full max-w-sm cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-rose-300 bg-white/60 p-6 text-center transition-colors hover:border-rose-400"
        >
          <CalendarHeart className="h-10 w-10 text-rose-500" />
          <input
            id="date-picker"
            type="date"
            min={todayISO()}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-center text-lg font-semibold text-plum-600 outline-none focus:border-rose-400"
            aria-label="Select date for the date"
          />
        </motion.label>

        {value && (
          <motion.p
            key={value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-lg font-semibold text-rose-600 sm:text-xl"
          >
            {formatFriendlyDate(value)} ✨
          </motion.p>
        )}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </StepShell>
  );
}
