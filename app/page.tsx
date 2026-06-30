"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingScreen } from "@/components/landing/LandingScreen";
import { DateStep } from "@/components/steps/DateStep";
import { PlaceStep } from "@/components/steps/PlaceStep";
import { FoodStep } from "@/components/steps/FoodStep";
import { TimeStep } from "@/components/steps/TimeStep";
import { SummaryStep } from "@/components/steps/SummaryStep";
import { ConfirmationScreen } from "@/components/steps/ConfirmationScreen";
import { ConfettiBurst } from "@/components/effects/ConfettiBurst";
import { HeartExplosion } from "@/components/effects/HeartExplosion";
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
  const [step, setStep] = useState<FlowStep>("landing");
  const [answers, setAnswers] = useState<DateAnswers>(INITIAL_ANSWERS);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const { isPlaying, toggle } = useBackgroundMusic();

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function handleYes() {
    setConfettiTrigger((t) => t + 1);
    setHeartTrigger((t) => t + 1);
    setTimeout(() => setStep("date"), 650);
  }

  function handleConfirm() {
    setConfettiTrigger((t) => t + 1);
    setStep("confirmation");
  }

  const screens: Record<FlowStep, React.ReactNode> = {
    landing: <LandingScreen onYes={handleYes} />,
    date: (
      <DateStep
        value={answers.date}
        onChange={(date) => setAnswers((a) => ({ ...a, date }))}
        onBack={() => setStep("landing")}
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
    <main className="relative min-h-dvh w-full">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {!isLoading && (
        <>
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
          <HeartExplosion trigger={heartTrigger} originX={50} originY={60} />

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
    </main>
  );
}
