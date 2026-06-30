# Will You Go On A Date With Me? ❤️

A premium, interactive romantic proposal experience built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- Cinematic landing screen with a YES button and a NO button that's physically impossible to click (it dodges your cursor and jumps away on touch)
- Confetti + heart explosion celebration on YES
- 5-step guided flow: date → place → food → time → summary
- Full-screen confirmation page with a typewriter message, a live countdown to the date, and an "I Love You" heart explosion button
- Glassmorphism cards, sunset gradients, floating hearts, sparkles
- Dark/light romantic theme toggle and an optional background music toggle
- Fully responsive, mobile-first, keyboard accessible, respects `prefers-reduced-motion`

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🗂 Project structure

```
app/                  Next.js App Router entry (layout, page, globals.css)
components/
  landing/            Hero ask screen, dodging NO button, escape toast
  steps/              Date / Place / Food / Time / Summary / Confirmation screens
  effects/            FloatingHearts, Sparkles, ConfettiBurst, HeartExplosion
  ui/                 Reusable primitives: Button, GlassCard, SelectableCard,
                       ProgressDots, Typewriter, SettingsBar, LoadingScreen
hooks/                useCountdown, useBackgroundMusic, useWindowSize
lib/                  utils.ts (cn, date/time formatting, countdown math)
types/                Shared TypeScript types
constants/            Copy, place/food options, dodge messages
public/sounds/        Drop an optional romantic-music.mp3 here
```

## 🎵 Optional background music

The music toggle works out of the box once you add a file at
`public/sounds/romantic-music.mp3`. Without it, the toggle simply stays off —
nothing breaks.

## 🎨 Customizing the theme

All colors, gradients, and animation tokens live in `tailwind.config.ts`
(`blush`, `rose`, `plum`, `lilac`, `sunset` color scales, `sunset-gradient` /
`dusk-gradient` backgrounds). Swap the place/food options, dodge messages, and
final confirmation copy in `constants/index.ts`.

## 🧩 Notes

- Built for Next.js 15 + React 19. Run `npm install` to pull dependencies —
  they are not vendored in this delivery.
- No external image assets are required; the experience uses emoji + CSS
  gradients for a crisp, dependency-light visual style.
