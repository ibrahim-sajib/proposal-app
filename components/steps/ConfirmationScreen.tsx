"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { Sparkles } from "@/components/effects/Sparkles";
import { HeartExplosion } from "@/components/effects/HeartExplosion";
import { useCountdown } from "@/hooks/useCountdown";
import { DateAnswers } from "@/types";

interface ConfirmationScreenProps {
  answers: DateAnswers;
}

const MESSAGE = `Yay!! ❤️
Our date is officially booked!
I can't wait to spend this beautiful day with you.
Thank you for saying YES.
I promise to make this date unforgettable.
See you soon ❤️`;

export function ConfirmationScreen({ answers }: ConfirmationScreenProps) {
  const [loveTrigger, setLoveTrigger] = useState(0);
  const countdown = useCountdown(answers.date, answers.time);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-sunset-gradient px-6 py-16 text-center">
      <FloatingHearts count={22} />
      <Sparkles count={26} />
      <HeartExplosion trigger={loveTrigger} originX={50} originY={55} particleCount={30} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 glass-card rounded-5xl p-8 sm:p-12"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-16 w-16 fill-rose-500 text-rose-500 drop-shadow-lg" />
        </motion.div>

        <p className="min-h-[170px] whitespace-pre-line font-display text-lg font-medium leading-relaxed text-plum-700 sm:text-xl">
          <Typewriter text={MESSAGE} speed={35} />
        </p>

        {countdown && answers.date && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-plum-400">
              Counting down to our date
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Sec", value: countdown.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex w-16 flex-col items-center rounded-2xl bg-white/70 py-3 shadow-glass sm:w-20"
                >
                  <span className="font-display text-2xl font-bold text-rose-600 sm:text-3xl">
                    {unit.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-plum-400 sm:text-xs">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="primary"
          size="xl"
          onClick={() => setLoveTrigger((t) => t + 1)}
          className="mt-2"
        >
          I Love You ❤️
        </Button>
      </motion.div>
    </div>
  );
}
