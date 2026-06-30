import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Returns a random integer between min (inclusive) and max (inclusive) */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns a random item from an array */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Formats an ISO date string (yyyy-mm-dd) into a friendly readable string */
export function formatFriendlyDate(iso: string | null): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Formats a 24h time string HH:mm into 12h friendly format */
export function formatFriendlyTime(time: string | null): string {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  let h = Number(hStr);
  const m = Number(mStr);
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m.toString().padStart(2, "0")} ${suffix}`;
}

/** Returns today's date as yyyy-mm-dd, used to disable past dates */
export function todayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Returns a breakdown countdown { days, hours, minutes, seconds } until the target ISO date (at given time) */
export function getCountdown(targetISO: string, time: string | null) {
  const [year, month, day] = targetISO.split("-").map(Number);
  let hours = 0;
  let minutes = 0;
  if (time) {
    const [h, m] = time.split(":").map(Number);
    hours = h;
    minutes = m;
  }
  const target = new Date(year, month - 1, day, hours, minutes).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return { days, hours: hrs, minutes: mins, seconds: secs, isPast: diff <= 0 };
}
