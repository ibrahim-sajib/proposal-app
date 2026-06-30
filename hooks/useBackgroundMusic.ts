"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Controls optional background music. The site ships without a bundled
 * audio file by default (to keep the repo lightweight) — drop an mp3 at
 * /public/sounds/romantic-music.mp3 and it will play automatically once
 * toggled on. Fails silently if the browser blocks autoplay or the file
 * is missing.
 */
export function useBackgroundMusic(src: string = "/sounds/romantic-music.mp3") {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audio.addEventListener("canplaythrough", () => setIsReady(true));
    audio.addEventListener("error", () => setIsReady(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setIsReady(false));
      setIsPlaying(true);
    }
  }

  return { isPlaying, isReady, toggle };
}

/** Plays a short one-off sound effect (e.g. heart pop). No-ops gracefully if missing. */
export function playSfx(src: string, volume = 0.5) {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    void audio.play().catch(() => {});
  } catch {
    // ignore — sound is a nice-to-have, never block the experience
  }
}
