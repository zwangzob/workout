# Forge

A workout-tracking app built around **your own exercise library and program rules**, instead of a fixed vendor program. You define the exercises, build (or auto-generate) a program from them, and the app adapts to whatever gym you're training at that day.

Everything is local-first: your library, programs, gym profiles, and workout history live on your device (`AsyncStorage`). There's no account, backend, or sync in this version.

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your iPhone (App Store) to run it — no Mac or Xcode required for day-to-day development. Shake the phone to open the dev menu (reload, etc.) if something looks stale.

If you ever want a fully native build (App Store distribution, custom native modules), that's a separate step — `npx expo prebuild` generates the `ios/` project, which does require Xcode on a Mac.

## How it's organized

- `app/` — screens, routed by file name via `expo-router`
  - `(tabs)/` — Today, Library, Progress, Profile
  - `workout/[sessionId].tsx` — the full-screen active-workout logger
  - `program/`, `exercise/` — creation/detail screens opened as modals
- `src/types/` — the data model (`Exercise`, `GymProfile`, `Program`, `WorkoutSession`, ...)
- `src/store/` — Zustand stores, one per data domain, each persisted to `AsyncStorage`
- `src/lib/substitutions.ts` — given an exercise + a gym profile, ranks equipment-compatible substitutes from your library
- `src/lib/programGenerator.ts` — the rule-based "auto-fill" that seeds a program's exercises from your library
- `src/data/seed*.ts` — starter exercise library (~60 exercises) and starter gym profiles (Commercial Gym / Home Gym / Bodyweight Only)
- `src/components/` — the shared UI kit (`Card`, `Button`, `WorkoutBlockCard`, etc.)

## The parts you said you want to iterate on

Two pieces were explicitly built as a **first pass, not a final answer**, since you want to tune how workouts actually get put together:

1. **`src/lib/programGenerator.ts`** — maps a split (Push/Pull/Legs, Upper/Lower, ...) to muscle-group targets per day, then greedily picks 1–2 available exercises per muscle group, favoring compounds first. It's a simple heuristic, not a periodization engine — no volume landmarks, no progressive overload scheme, no fatigue management. Good starting point to replace or layer on top of.
2. **`src/lib/substitutions.ts`** — ranks substitutes by shared primary muscle first, then secondary-muscle overlap, filtered to equipment your active `GymProfile` actually has. Straightforward to extend (e.g. weight by exercise similarity, joint angle, unilateral vs. bilateral, etc.) once you've used it for a while and know what it gets wrong.

Everything else (screens, set logging, rest timer, substitution UI, program builder form) is meant to be a solid, usable foundation — the two files above are where the "smarts" should keep evolving.

## Design reference

The visual language (light cream background, indigo accent, lettered superset badges with a connecting line, warm-up sets tracked separately from working sets, bottom-sheet substitute picker, segmented gym-profile switcher) was modeled on screenshots you shared of your current app — not literally copied assets, but the same structural patterns and a similar (not identical) color family. Exercise "thumbnails" are simple icon placeholders since there's no photo/video library behind this yet.

## What's not built yet

- Exercise photos/videos (currently icon placeholders)
- Editing exercises/sets *within* an existing program day after it's generated (today you can regenerate, swap during a workout, or delete the whole program)
- Percentage-of-1RM or RPE-based auto-progression across weeks
- Any cloud sync — this is single-device only
