# PSN Trophies

A personal portfolio project to explore and showcase PlayStation Network trophy data. Built with Next.js 16 App Router and React 19 as a demonstration of modern frontend development patterns.

https://psn-trophies.vercel.app

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS v4
- **Language:** TypeScript
- **Components:** Radix UI + CVA (class-variance-authority)
- **Animations:** Framer Motion
- **Linter/Formatter:** Biome
- **Package manager:** pnpm

## Features

- Dashboard with recent games and trophy progress
- Per-game trophy detail page
- User profile with stats and level
- Side-by-side user comparison

## Getting Started

Add your PSN NPSSO token to `.env.local`:

```bash
PSN_NPSSO=your_npsso_token_here
```

> To get your NPSSO token, log in to [my.playstation.com](https://my.playstation.com), open DevTools, go to Application → Cookies and copy the value of the `npsso` cookie.

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # Run Biome linter
pnpm format   # Format with Biome
pnpm check    # Lint + format with Biome
```
