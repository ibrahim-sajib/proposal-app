"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Clock, MapPin, Utensils } from "lucide-react";
import { StepShell } from "@/components/steps/StepShell";
import { Button } from "@/components/ui/Button";
import { DateAnswers } from "@/types";
import { FOOD_OPTIONS, PLACE_OPTIONS } from "@/constants";
import { formatFriendlyDate, formatFriendlyTime } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface SummaryStepProps {
  answers: DateAnswers;
  onBack: () => void;
  onConfirm: () => void;
}

export function SummaryStep({ answers, onBack, onConfirm }: SummaryStepProps) {
  const place = PLACE_OPTIONS.find((p) => p.id === answers.place);
  const foods = FOOD_OPTIONS.filter((f) => answers.foods.includes(f.id));

  const rows = [
    {
      icon: CalendarHeart,
      label: "Date",
      value: formatFriendlyDate(answers.date),
    },
    {
      icon: Clock,
      label: "Time",
      value: formatFriendlyTime(answers.time),
    },
    {
      icon: MapPin,
      label: "Place",
      value: place ? `${place.emoji} ${place.label}` : "—",
    },
    {
      icon: Utensils,
      label: "Food",
      value: foods.length
        ? foods.map((f) => `${f.emoji} ${f.label}`).join(", ")
        : "—",
    },
  ];

  return (
    <StepShell
      title="Let's confirm our date"
      subtitle="Here's everything, just the way you planned it."
      stepIndex={4}
      totalSteps={5}
    >
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ff003c]/20 text-[#ff3366] border border-[#ff3366]/30">
              <row.icon size={20} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                {row.label}
              </p>
              <p className="font-display text-base font-semibold text-white sm:text-lg">
                {row.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button variant="ghost" size="md" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </Button>
        <Button variant="primary" size="lg" onClick={onConfirm}>
          Confirm Booking ❤️
        </Button>
      </div>
    </StepShell>
  );
}
