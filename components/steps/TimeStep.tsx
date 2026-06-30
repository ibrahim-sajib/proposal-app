"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { StepShell } from "@/components/steps/StepShell";
import { StepNav } from "@/components/steps/StepNav";
import { formatFriendlyTime } from "@/lib/utils";

interface TimeStepProps {
  value: string | null;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const SUGGESTED_TIMES = ["12:00", "15:00", "18:00", "19:30", "20:00"];

export function TimeStep({ value, onChange, onBack, onNext }: TimeStepProps) {
  return (
    <StepShell
      title="What time should we meet?"
      subtitle="Choose a time, or pick a suggestion."
      stepIndex={3}
      totalSteps={5}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.label
          htmlFor="time-picker"
          whileHover={{ scale: 1.02 }}
          className="flex w-full max-w-sm cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-[#ff3366]/40 bg-white/5 p-6 text-center transition-colors hover:border-[#ff3366]"
        >
          <Clock className="h-10 w-10 text-[#ff3366]" />
          <input
            id="time-picker"
            type="time"
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
            aria-label="Select meeting time"
          />
        </motion.label>

        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                value === t
                  ? "bg-[#ff003c] text-white shadow-[0_0_15px_#ff3366]"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {formatFriendlyTime(t)}
            </button>
          ))}
        </div>

        {value && (
          <motion.p
            key={value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-lg font-semibold text-[#ffd700] sm:text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
          >
            {formatFriendlyTime(value)} ⏰
          </motion.p>
        )}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </StepShell>
  );
}
