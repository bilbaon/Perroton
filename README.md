# PawProgress 🐾

**The TrainingPeaks for dog training.** Structured expert-designed programs, daily sessions, streak tracking, and a complete log of your dog's learning journey.

## Tech Stack

- **React Native** with [Expo](https://expo.dev) SDK 51 (managed workflow)
- **expo-router** v3 for file-based navigation
- **React Navigation v6** — bottom tabs + stack navigators
- **Zustand** for client state
- **Supabase** (backend — auth, Postgres + RLS, storage)

## Project Structure

```
app/
├── (tabs)/          # Main tab screens (Home, Programs, Progress, Profile)
├── auth/            # Welcome, Login, Signup
├── session/[id]     # Session walkthrough (full-screen modal)
├── program/[id]     # Program detail + enroll
└── dog/             # Add dog, dog profile
src/
├── theme/           # Design tokens (colors, spacing, typography)
└── types/           # TypeScript type definitions
```

## Getting Started

```bash
npm install
npx expo start
```

Open in Expo Go on iOS/Android, or press `w` for web.

## Deploy to Vercel (Web)

```bash
npx expo export --platform web
vercel --prod
```

Or connect the GitHub repo to Vercel — it will auto-detect the build command from `vercel.json`.

## MVP Features

- [x] Multi-dog profiles with switcher
- [x] Program catalog (5 expert-designed programs)
- [x] Program detail view with weekly curriculum preview
- [x] Daily session card on home screen
- [x] Step-by-step session walkthrough with paw ratings
- [x] Streak tracker
- [x] Session history & weekly completion chart
- [x] Dog profile CRUD
- [x] Auth screens (Email + Apple + Google stubs)
- [ ] Supabase backend integration (in progress)
- [ ] Push notifications
- [ ] Offline mode

## Programs

| Program | Level | Duration | Frequency |
|---|---|---|---|
| Puppy Basics | Puppy | 8 weeks | 3x/week |
| Fundamental Skills | Beginner | 12 weeks | 4x/week |
| Impulse Control | Intermediate | 6 weeks | 3x/week |
| Urban Dog | Intermediate | 8 weeks | 3x/week |
| Trail & Outdoors | Intermediate | 6 weeks | 3x/week |
