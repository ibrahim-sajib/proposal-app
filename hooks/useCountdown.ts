"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

export function useCountdown(targetISO: string | null, time: string | null) {
  const [countdown, setCountdown] = useState(() =>
    targetISO ? getCountdown(targetISO, time) : null
  );

  useEffect(() => {
    if (!targetISO) return;
    setCountdown(getCountdown(targetISO, time));
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetISO, time));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetISO, time]);

  return countdown;
}
