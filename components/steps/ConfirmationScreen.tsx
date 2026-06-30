"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { useCountdown } from "@/hooks/useCountdown";
import { DateAnswers } from "@/types";
import { SENDER_NAME, RECEIVER_NAME } from "@/constants";

interface ConfirmationScreenProps {
  answers: DateAnswers;
}

const MESSAGE = `Yay!! ❤️
Our date is officially booked!
I can&apos;t wait to spend this beautiful day with you.
Thank you for saying YES.
I promise to make this date unforgettable.
See you soon ❤️`;

export function ConfirmationScreen({ answers }: ConfirmationScreenProps) {
  const [phase, setPhase] = useState<"intro" | "reveal">("intro");
  const [showSender, setShowSender] = useState(false);
  const countdown = useCountdown(answers.date, answers.time);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center select-none bg-transparent">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 pointer-events-none"
          >
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.32, 0.94, 0.6, 1], // gravity drop ease
              }}
              onAnimationComplete={() => {
                // 1. Trigger camera shake
                window.dispatchEvent(new CustomEvent("romantic-shake"));
                
                // 2. Trigger golden canvas blast
                window.dispatchEvent(
                  new CustomEvent("romantic-blast", {
                    detail: {
                      x: window.innerWidth / 2,
                      y: window.innerHeight / 2,
                      amount: 250,
                      isGold: true,
                    },
                  })
                );

                // 3. Show sender signature and then transit phase
                setShowSender(true);
                setTimeout(() => {
                  setPhase("reveal");
                }, 3800);
              }}
              className="text-center px-6 flex flex-col items-center"
            >
              <motion.h1
                animate={showSender ? { scale: [0.9, 1.12, 1] } : {}}
                transition={{ type: "spring", stiffness: 350, damping: 10 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_30px_#ff3366]"
              >
                I Love You, {RECEIVER_NAME}! ❤️
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={showSender ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl text-[#ffd700] mt-8 font-light tracking-widest drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
              >
                Yours forever, {SENDER_NAME}
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 glass-card rounded-5xl p-8 sm:p-12 border border-white/20 shadow-[0_0_40px_rgba(255,0,60,0.25)]"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-16 w-16 fill-[#ff3366] text-[#ff3366] drop-shadow-[0_0_15px_rgba(255,51,102,0.6)]" />
            </motion.div>

            <p className="min-h-[170px] whitespace-pre-line font-display text-lg font-medium leading-relaxed text-white sm:text-xl">
              <Typewriter text={MESSAGE} speed={35} />
            </p>

            {countdown && answers.date && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
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
                      className="flex w-16 flex-col items-center rounded-2xl bg-white/5 border border-white/10 py-3 shadow-glass sm:w-20"
                    >
                      <span className="font-display text-2xl font-bold text-[#ff3366] sm:text-3xl drop-shadow-[0_0_8px_rgba(255,51,102,0.4)]">
                        {unit.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-white/50 sm:text-xs">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 mt-2">
              <Button
                variant="primary"
                size="xl"
                onClick={(e) => {
                  window.dispatchEvent(
                    new CustomEvent("romantic-blast", {
                      detail: {
                        x: e.clientX,
                        y: e.clientY,
                        amount: 50,
                        isGold: false,
                      },
                    })
                  );
                }}
              >
                I Love You ❤️
              </Button>
              <p className="text-sm text-white/40 font-light mt-2 italic">
                Yours forever, {SENDER_NAME}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
