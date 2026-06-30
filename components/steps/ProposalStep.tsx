"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DodgingNoButton } from "@/components/landing/DodgingNoButton";
import { EscapeToast } from "@/components/landing/EscapeToast";
import { RECEIVER_NAME } from "@/constants";

interface ProposalStepProps {
  onYes: () => void;
}

export function ProposalStep({ onYes }: ProposalStepProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  function handleEscape(message: string) {
    setToastMessage(message);
    setToastKey((k) => k + 1);
  }

  return (
    
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <EscapeToast message={toastMessage} toastKey={toastKey} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl glass-card p-8 sm:p-12 flex flex-col items-center gap-8 border border-white/20 shadow-[0_0_40px_rgba(255,0,60,0.25)]"
      >
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          You are my greatest adventure, my safest home, and my one true love. Will
          you go on another beautiful date with me,{" "}
          <span className="font-semibold text-[#ffd700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
            {RECEIVER_NAME}
          </span>
          ?
        </h1>

        <div className="relative mt-4 flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10 min-h-[80px]">
          <Button variant="primary" size="lg" onClick={onYes} className="w-56 font-bold text-lg">
            Yes, I&apos;d love to ❤️
          </Button>

          <DodgingNoButton onEscape={handleEscape} />
        </div>
      </motion.div>
    </div>
  );
}
