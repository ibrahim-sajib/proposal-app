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
      title="Let's plan our next beautiful date ❤️"
      subtitle="Pick a day to create another unforgettable memory together."
      stepIndex={0}
      totalSteps={5}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.label
          htmlFor="date-picker"
          whileHover={{ scale: 1.02 }}
          className="flex w-full max-w-sm cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-[#ff3366]/40 bg-white/5 p-6 text-center transition-colors hover:border-[#ff3366]"
        >
          <CalendarHeart className="h-10 w-10 text-[#ff3366]" />
          <input
            id="date-picker"
            type="date"
            min={todayISO()}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            onClick={(e) => {
              try {
                e.currentTarget.showPicker();
              } catch (err) {}
            }}
            onFocus={(e) => {
              try {
                e.currentTarget.showPicker();
              } catch (err) {}
            }}
            className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-center text-lg font-semibold text-white outline-none focus:border-[#ff3366]"
            aria-label="Select date for the date"
          />
        </motion.label>

        {value && (
          <motion.p
            key={value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-lg font-semibold text-[#ffd700] sm:text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
          >
            {formatFriendlyDate(value)} ✨
          </motion.p>
        )}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </StepShell>
  );
}
