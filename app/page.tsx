"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Task1CatchHearts } from "@/components/steps/Task1CatchHearts";
import { LongMessageStep } from "@/components/steps/LongMessageStep";
import { Task2TapHeart } from "@/components/steps/Task2TapHeart";
import { ProposalStep } from "@/components/steps/ProposalStep";
import { DateStep } from "@/components/steps/DateStep";
import { PlaceStep } from "@/components/steps/PlaceStep";
import { FoodStep } from "@/components/steps/FoodStep";
import { TimeStep } from "@/components/steps/TimeStep";
import { SummaryStep } from "@/components/steps/SummaryStep";
import { ConfirmationScreen } from "@/components/steps/ConfirmationScreen";
import { ConfettiBurst } from "@/components/effects/ConfettiBurst";
import { RomanticCanvas } from "@/components/effects/RomanticCanvas";
import { SettingsBar } from "@/components/ui/SettingsBar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { DateAnswers, FlowStep } from "@/types";

const INITIAL_ANSWERS: DateAnswers = {
  date: null,
  place: null,
  foods: [],
  time: null,
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<FlowStep>("task1");
  const [answers, setAnswers] = useState<DateAnswers>(INITIAL_ANSWERS);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [task1Score, setTask1Score] = useState(0);
  const [customBurst, setCustomBurst] = useState<{ x: number; y: number; isGold?: boolean } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isPlaying, toggle } = useBackgroundMusic();

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handleShake = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    };
    window.addEventListener("romantic-shake", handleShake);
    return () => window.removeEventListener("romantic-shake", handleShake);
  }, []);

  function handleConfirm() {
    setConfettiTrigger((t) => t + 1);
    setStep("confirmation");
  }

  const screens: Record<FlowStep, React.ReactNode> = {
    task1: <Task1CatchHearts score={task1Score} />,
    longMessage: <LongMessageStep onContinue={() => setStep("task2")} />,
    task2: (
      <Task2TapHeart
        onComplete={() => setStep("proposal")}
        onHeartTap={(x, y) => setCustomBurst({ x, y, isGold: false })}
      />
    ),
    proposal: (
      <ProposalStep
        onYes={() => {
          setConfettiTrigger((t) => t + 1);
          setStep("date");
        }}
      />
    ),
    date: (
      <DateStep
        value={answers.date}
        onChange={(date) => setAnswers((a) => ({ ...a, date }))}
        onBack={() => setStep("proposal")}
        onNext={() => setStep("place")}
      />
    ),
    place: (
      <PlaceStep
        value={answers.place}
        onChange={(place) => setAnswers((a) => ({ ...a, place }))}
        onBack={() => setStep("date")}
        onNext={() => setStep("food")}
      />
    ),
    food: (
      <FoodStep
        value={answers.foods}
        onChange={(foods) => setAnswers((a) => ({ ...a, foods }))}
        onBack={() => setStep("place")}
        onNext={() => setStep("time")}
      />
    ),
    time: (
      <TimeStep
        value={answers.time}
        onChange={(time) => setAnswers((a) => ({ ...a, time }))}
        onBack={() => setStep("food")}
        onNext={() => setStep("summary")}
      />
    ),
    summary: (
      <SummaryStep
        answers={answers}
        onBack={() => setStep("time")}
        onConfirm={handleConfirm}
      />
    ),
    confirmation: <ConfirmationScreen answers={answers} />,
  };

  return (
    <motion.main
      animate={
        isShaking
          ? {
              x: [-10, 10, -10, 10, -5, 5, -5, 5, 0],
              y: [-5, 5, -5, 5, -3, 3, -3, 3, 0],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
      className="relative min-h-dvh w-full overflow-hidden"
    >
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {!isLoading && (
        <>
          <RomanticCanvas
            activeGame={step === "task1" ? "task1" : "none"}
            onTask1HeartCaught={() => {
              setTask1Score((s) => {
                const next = s + 1;
                if (next === 3) {
                  // Win task 1!
                  setTimeout(() => {
                    setStep("longMessage");
                  }, 800);
                }
                return next;
              });
            }}
            customBurstTrigger={customBurst}
          />

          <SettingsBar
            isDark={isDark}
            onToggleTheme={() => setIsDark((d) => !d)}
            isMusicPlaying={isPlaying}
            onToggleMusic={toggle}
          />

          <ConfettiBurst
            trigger={confettiTrigger}
            variant={step === "confirmation" ? "grand" : "soft"}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {screens[step]}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </motion.main>
  );
}
