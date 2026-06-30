"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiBurstProps {
  /** Bumping this number triggers a new burst */
  trigger: number;
  /** "soft" for a quick celebratory pop, "grand" for a longer multi-burst finale */
  variant?: "soft" | "grand";
}

const ROMANTIC_COLORS = ["#FF6FA5", "#C9A8E9", "#FFD36E", "#FF9A8B", "#FFFFFF"];

function fireSoft() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ROMANTIC_COLORS,
    scalar: 0.9,
  });
}

function fireGrand() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0 },
      colors: ROMANTIC_COLORS,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1 },
      colors: ROMANTIC_COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.5 },
    colors: ROMANTIC_COLORS,
    startVelocity: 45,
  });

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.4 },
      colors: ROMANTIC_COLORS,
      shapes: ["circle"],
      scalar: 1.1,
    });
  }, 400);
}

/** Headless component: fires a canvas-confetti burst whenever `trigger` changes. */
export function ConfettiBurst({ trigger, variant = "soft" }: ConfettiBurstProps) {
  useEffect(() => {
    if (trigger <= 0) return;
    if (variant === "grand") fireGrand();
    else fireSoft();
  }, [trigger, variant]);

  return null;
}
