"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DodgingNoButton } from "@/components/landing/DodgingNoButton";
import { EscapeToast } from "@/components/landing/EscapeToast";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { Sparkles } from "@/components/effects/Sparkles";

interface LandingScreenProps {
  onYes: () => void;
}

export function LandingScreen({ onYes }: LandingScreenProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  function handleEscape(message: string) {
    setToastMessage(message);
    setToastKey((k) => k + 1);
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-sunset-gradient px-6 py-16 text-center">
      <FloatingHearts count={16} />
      <Sparkles count={20} />

      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-plum-400/30 blur-3xl"
      />

      <EscapeToast message={toastMessage} toastKey={toastKey} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex max-w-2xl flex-col items-center gap-8"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-16 w-16 place-items-center rounded-full bg-white/30 backdrop-blur-md"
        >
          <Heart className="h-8 w-8 fill-white text-white" />
        </motion.div>

        <h1 className="font-display text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Will you go on a date with me? <span className="inline-block">❤️</span>
        </h1>

        <div className="relative mt-4 flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <Button
            variant="primary"
            size="xl"
            onClick={onYes}
            className="w-56 !bg-white !bg-none text-rose-600 shadow-glow-lg hover:!bg-rose-50"
          >
            YES ❤️
          </Button>

          <DodgingNoButton onEscape={handleEscape} />
        </div>
      </motion.div>
    </div>
  );
}
