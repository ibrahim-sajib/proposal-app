"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

/** Reveals text one character at a time, respecting prefers-reduced-motion. */
export function Typewriter({
  text,
  speed = 45,
  className,
  onComplete,
  startDelay = 0,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplayed(text);
      onComplete?.();
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse-soft">|</span>
    </span>
  );
}
