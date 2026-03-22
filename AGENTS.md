<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Component organization

```
src/components/
├── ui/          ← Atomic UI primitives (Button, Badge, Input...)
├── magic-ui/    ← Magic UI components (ShineBorder, ...)
├── shared/      ← Generic reusable components (ErrorState, Spinner, EmptyState...)
└── psn/         ← Business components specific to the PSN domain (GameCard, TrophyList...)
```

**Rule of thumb:** if the component could live in any other project → `ui/` or `shared/`. If it only makes sense here → `psn/`.

---

# UI component file structure

Each component lives in its own PascalCase folder:

```
src/components/ui/ComponentName/
├── ComponentName.types.ts      ← always
├── ComponentName.tsx           ← always (named export, no default)
├── ComponentName.constants.ts  ← domain constants, lookup maps, static config
├── ComponentName.variants.ts   ← only if the component uses CVA
└── index.ts                    ← re-exports everything with `export * from`
```

- Use `@lib/utils` for `cn()`
- `ComponentName.types.ts` exports `ComponentNameProps` (and `ComponentNameVariantProps` if variants exist)
- `ComponentName.variants.ts` exports `componentNameVariants`

---

# Git commit convention

Format: `<emoji> <type>: <description in English, lowercase>`

| Emoji | Type | When |
|-------|------|------|
| 🚀 | `feat` | New feature |
| 🔨 | `refactor` | Code restructure without functional change |
| 🔧 | `chore` | Maintenance, deps, config |
| 🐛 | `fix` | Bug fix |
| 💄 | `style` | Visual / style changes |
| 📝 | `docs` | Documentation |
| ✅ | `test` | Tests |

- No trailing period
- Max ~72 characters
- No scope in parentheses

---

# Import aliases and barrel files

Always use path aliases instead of relative paths. Available aliases:

| Alias | Resolves to |
|-------|-------------|
| `@app/*` | `src/app/*` |
| `@components` | `src/components/index.ts` |
| `@components/*` | `src/components/*` |
| `@services/*` | `src/services/*` |
| `@lib` | `src/lib/index.ts` |
| `@lib/*` | `src/lib/*` |
| `@types` | `src/types/index.ts` |

Every folder that exports code must have an `index.ts` that re-exports its modules with `export * from`. Consumers always import from the folder, never from the file directly.

```ts
// ❌ BAD
import { LandingHero } from '@app/_components/Landing/LandingHero'

// ✅ GOOD
import { LandingHero } from '@app/_components/Landing'
```

---

# Where types live

Types are split by **consumer**, not by origin.

| Location | What goes there |
|----------|----------------|
| `src/types/` | Domain types that the UI touches directly: primitives, enums, shared interfaces (`TierGrade`, `PSNImage`, `PSNGame`...) |
| `src/services/*/psn.types.ts` | Service I/O types and intersections that depend on the service layer. If the UI only sees them indirectly (through props or page data), they can stay here |
| `ComponentName.types.ts` | Component-specific props and local interfaces |

The rule of thumb: **if a component has to import a type, it should come from `src/types/` or a component's own `.types.ts` — never reach into a service folder.**

---

# Code breathing room

```ts
// ❌ BAD — aglomerado, difícil de escanear
async function authorize() {
  const npsso = process.env.PSN_NPSSO
  if (!npsso) throw new PSNConfigurationError()
  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const { accessToken } = await exchangeAccessCodeForAuthTokens(accessCode)
  return { accessToken }
}

// ✅ GOOD — cada etapa respira
async function authorize() {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) throw new PSNConfigurationError()

  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const { accessToken } = await exchangeAccessCodeForAuthTokens(accessCode)

  return { accessToken }
}
```

---

# File organization within a module

When a file contains constants, functions, and data structures, order them by dependency — simpler things first, composite things last. Use section comments to make the structure scannable:

```ts
// --- Base constants ---
// Primitive values and lookup maps that everything else depends on.

// --- Utility functions ---
// Pure functions that transform data. No cross-dependencies between them.

// --- Derived data ---
// Structures that combine base constants and utility functions.
```

This rule applies to any `.constants.ts`, `.utils.ts`, or similar file.

---

# Where utility functions live

Utility functions are split by **scope**, not by file size.

| File | What goes there |
|------|----------------|
| `src/lib/utils.ts` | Truly generic helpers with no domain knowledge (`cn`, `formatCount`) |
| `src/lib/psn.utils.ts` | PSN-domain helpers that components need but belong to no single component (`resolveAvatarUrl`) |
| `ComponentName.constants.ts` | Helpers used only by that one component |

The rule of thumb: **if two components would need the same function, it moves up to `src/lib/`. If it's PSN-specific, it goes to `psn.utils.ts`; if it's truly generic, it goes to `utils.ts`.**

```ts
// ❌ BAD — PSN-domain logic buried in a component's constants file
// DashboardHeader.constants.ts
export const resolveAvatarUrl = (profile: AvatarSource) => { ... }

// ✅ GOOD — shared, importable via @lib
// src/lib/psn.utils.ts
export function resolveAvatarUrl(profile: AvatarSource) { ... }
```

---

# Extract logic into named functions

Never let inline logic grow inside a component or a function signature. When an expression spans more than 2-3 lines, extract it into a named function that lives in the `.constants.ts` or `.utils.ts` file.

```tsx
// ❌ BAD — logic growing inline
const avatarUrl =
  profile?.personalDetail?.profilePictures?.find((p) => p.size === 'xl')?.url ??
  profile?.personalDetail?.profilePictures?.find((p) => p.size === 'l')?.url ??
  profile?.avatars.find((a) => a.size === 'xl')?.url ??
  profile?.avatars[profile.avatars.length - 1]?.url

// ✅ GOOD — named function, testable in isolation
const avatarUrl = profile ? resolveAvatarUrl(profile) : undefined
```

The same applies to inline type annotations in function signatures — if a parameter type is complex, extract it into a named interface in the `.types.ts` file. **Never declare interfaces inside `.constants.ts` or `.utils.ts`.**

```ts
// ❌ BAD — interface buried inside .constants.ts
interface AvatarSource { ... }
export const resolveAvatarUrl = (profile: AvatarSource) => { ... }

// ✅ GOOD — interface in .types.ts, imported into .constants.ts
// DashboardHeader.types.ts
export interface AvatarSource { ... }

// DashboardHeader.constants.ts
import type { AvatarSource } from './DashboardHeader.types'
export const resolveAvatarUrl = (profile: AvatarSource) => { ... }
```

---

# Code comments

Do not add comments that narrate what the code does. Well-named functions, variables and components are self-documenting.

Only add a comment when it explains something the code cannot express by itself:
- A non-obvious trade-off or architectural decision
- A workaround for a bug or external limitation
- A business rule that isn't evident from the logic

```ts
// ❌ BAD — narrates the obvious
// Fetch the user's trophies
const trophies = await getRecentTrophies()

// ✅ GOOD — explains a non-obvious constraint
// PSN API returns at most 500 titles; we limit to 15 to stay within the free tier rate limit
const trophies = await getRecentTrophies({ limit: 15 })
```

---

# Semantic HTML and accessibility

Use semantic HTML elements for content. Reserve `<div>` and `<span>` for purely decorative or layout-only elements with no content meaning.

## Landmark elements

| Use | When |
|-----|------|
| `<main>` | Primary page content (once per page) |
| `<section aria-labelledby="...">` | Standalone content section with a heading |
| `<article>` | Self-contained content (a card, a post) |
| `<header>` / `<footer>` | Section or page header/footer |
| `<nav aria-label="...">` | Navigation landmarks |

## Decorative elements

Purely decorative elements (background layers, visual symbols, icons without text) must be hidden from assistive technology with `aria-hidden="true"`. Do **not** add `role="presentation"` alongside it — they are redundant; `aria-hidden` already removes the element from the accessibility tree entirely.

```tsx
// ❌ BAD — screen reader announces "triangle circle cross square"
<div>
  <span>△</span>
  <span>○</span>
</div>

// ❌ BAD — role="presentation" is redundant with aria-hidden
<div aria-hidden="true" role="presentation" />

// ✅ GOOD — aria-hidden is sufficient
<div aria-hidden="true">
  <span aria-hidden="true">△</span>
  <span aria-hidden="true">○</span>
</div>
```

## Lists of items

When rendering a collection of related items (stats, cards, options), use `<ul>/<li>` — not a series of `<div>`. This communicates structure to assistive technology and allows screen readers to announce item count.

```tsx
// ❌ BAD — no list semantics
<div className="flex gap-4">
  {trophies.map(t => <div key={t.key}>...</div>)}
</div>

// ✅ GOOD
<ul className="flex gap-4 list-none">
  {trophies.map(t => <li key={t.key}>...</li>)}
</ul>
```

## Screen reader context for numbers

`aria-label` is only valid on elements with an implicit or explicit ARIA role (buttons, inputs, landmarks…). A bare `<span>` has no role, so `aria-label` is ignored. Use a visually hidden `sr-only` span to add context:

```tsx
// ❌ BAD — aria-label is invalid on a role-less <span>
<span aria-label="Level 432" style={{ color }}>432</span>

// ✅ GOOD — sr-only text is read, number is visible
<span style={{ color }}>
  <span className="sr-only">Level </span>
  432
</span>
```

## Visual-only line breaks

Never use `<br />` for visual line breaks. Control line wrapping with CSS (`block`, `whitespace`, etc.).

```tsx
// ❌ BAD — presentational markup in HTML
<h1>Trophy<br /><span>Hub</span></h1>

// ✅ GOOD — visual break via CSS
<h1>Trophy <span className="block">Hub</span></h1>
```

## Tailwind and long class strings

When a JSX element accumulates too many Tailwind classes, extract it into a named sub-component. Complex arbitrary CSS values (gradients, grid patterns) belong in named classes in `globals.css`, not inline as Tailwind arbitrary values.

```tsx
// ❌ BAD — unreadable inline arbitrary CSS
<div className="bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(0,87,184,0.12),transparent)]" />

// ✅ GOOD — named class in globals.css
<div className="bg-landing-glow" />
```

---

# Service layer naming

Services must be agnostic to their consumers. Name functions and types after **what data they represent**, never after who uses them.

```ts
// ❌ BAD — couples the service to a specific page
export async function getDashboardData(): Promise<DashboardData> { ... }

// ✅ GOOD — describes the data, not the consumer
export async function getUserOverview(): Promise<UserOverview> { ... }
```

This applies equally to types: `DashboardData` → `UserOverview`, `ProfilePageData` → `UserProfile`, etc.

---

# When to promote a function to lib/

A function moves to `lib/` when **two or more modules need it** — not before. The trigger is demand, not how generic the function looks.

```
Step 1: function lives in the only file that uses it
Step 2: a second module needs it → move to lib/utils.ts (generic) or lib/psn.utils.ts (PSN domain)
```

Moving a function to `lib/` before a second consumer exists adds indirection with no benefit (premature abstraction).

---

# Dead code

Delete exported functions and types with no consumers. Code that is never called is not "potentially useful" — it is noise that misleads future readers and has to be maintained for no reason. `git` preserves history; there is no need to keep unused code as a safety net.

---

# Adding a shadcn component

shadcn generates files in its own flat structure. Always adapt them to the project's folder convention after installing.

**Step 1 — Install via CLI**
```bash
pnpm dlx shadcn@latest add <component>
```

**Step 2 — Delete the generated file**

shadcn drops a flat file like `src/components/ui/progress.tsx`. Delete it.

**Step 3 — Create the proper folder structure**
```
src/components/ui/<component>/
├── <Component>.types.ts   ← extract props interface here
├── <Component>.tsx        ← the component (named export, no default)
└── index.ts               ← export * from each file
```

Folder name is lowercase (`progress/`), component file is PascalCase (`Progress.tsx`).

**Step 4 — Adapt the generated code**
- Replace `@/lib/utils` import with `@lib`
- Change `function Component` to a named export if it isn't already
- Move the props type to `<Component>.types.ts`
- Extend the props interface if the component needs custom styling hooks (e.g. `indicatorStyle`, `indicatorClassName`)

**Step 5 — Export from the ui barrel**

Add `export * from './<component>'` to `src/components/ui/index.ts`.

---

# Caching external API calls (ISR)

This project uses Next.js 16's **Cache Components** model (`use cache` + `cacheLife` + `cacheTag`) — not the legacy `revalidate` export or `fetch` options.

## Setup

`cacheComponents: true` must be enabled in `next.config.ts`. Custom cache profiles are defined there too:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    psn: {
      stale: 60,       // client serves cached for 1 min without checking
      revalidate: 300, // background refresh every 5 minutes
      expire: 3600,    // hard expire after 1 hour of inactivity
    },
  },
}
```

## Caching a service function

Add the directives at the top of the function body — not at file level, to avoid caching error paths:

```ts
import { cacheLife, cacheTag } from 'next/cache'

export async function getUserOverview(): Promise<UserOverview> {
  'use cache'
  cacheLife('psn')
  cacheTag('psn-overview')

  // ... API calls
}
```

- `'use cache'` — marks the function's return value as cacheable
- `cacheLife('psn')` — uses the custom profile defined in `next.config.ts`
- `cacheTag('psn-overview')` — allows on-demand invalidation via `revalidateTag('psn-overview')`

## Cache profile reference

| Profile    | stale | revalidate | expire | When to use |
|------------|-------|------------|--------|-------------|
| `seconds`  | 30s   | 1s         | 1m     | Live scores, real-time |
| `minutes`  | 5m    | 1m         | 1h     | Social feeds |
| `hours`    | 5m    | 1h         | 1d     | Product data |
| `days`     | 5m    | 1d         | 1w     | Blog posts |
| `psn`      | 1m    | 5m         | 1h     | PSN API (rate-limit protection) |

## On-demand invalidation

To force a refresh (e.g. after earning a trophy):

```ts
import { revalidateTag } from 'next/cache'
revalidateTag('psn-overview') // stale-while-revalidate
```

## Request-level deduplication with `React.cache`

`'use cache'` persists results across requests. `React.cache` deduplicates within a single render — if two components call the same function in the same render, the second call returns the memoized result without re-executing.

Use it on helper functions (like `authorize()`) that could be called by multiple service functions in the same render:

```ts
import { cache } from 'react'

const authorize = cache(async () => {
  // ... auth logic
})
```

The two are complementary — use both together when appropriate:

```
Request 1 ──► authorize() ──► [React.cache] ──► PSN auth (1 real call)
              getUserOverview() ────────────────┘ (same request, reuses token)
              getUserTrophies() ────────────────┘ (same request, reuses token)

Request 2 ──► getUserOverview() ──► ['use cache'] ──► no PSN call (cached result)
```

> **Good to know:** `React.cache` is scoped to the current request only. Each request gets its own memoization scope with no sharing between requests.

---

# Streaming and Suspense

This project uses granular `<Suspense>` boundaries — not a single page-level one — so the static shell (title, layout) renders immediately and each section streams in independently.

## Pattern: async section components

Push data fetching into async Server Components wrapped in `<Suspense>`. The page itself is synchronous:

```tsx
// page.tsx — sync, renders instantly
export default function DashboardPage() {
  return (
    <main>
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />  {/* async — fetches data, suspends */}
      </Suspense>
      <Suspense fallback={<GamesGridSkeleton />}>
        <GamesGrid />               {/* async — fetches data, suspends */}
      </Suspense>
    </main>
  )
}
```

Each `*Section` component calls the cached service function. Because the function uses `'use cache'`, both components share the same cached result.

## Route files

| File | Purpose |
|------|---------|
| `loading.tsx` | Shown immediately on navigation (Next.js wraps the page in a Suspense boundary). Use the same skeletons as the in-page Suspense fallbacks. |
| `error.tsx` | Runtime error boundary (Client Component). Use `unstable_retry` prop to retry. Name the default export something other than `Error` to avoid shadowing the global. |

## Skeletons

- Match the dimensions of the real component to minimize CLS (Cumulative Layout Shift).
- Add `aria-hidden="true"` on the skeleton root — screen readers have no benefit from announcing empty placeholders. Child elements inherit it; do not repeat it on children.
- For list skeletons, use a stable static key array instead of array index.

```tsx
// ❌ BAD — index as key, no aria-hidden
{Array.from({ length: 4 }).map((_, i) => <li key={i} />)}

// ✅ GOOD — stable keys, root hidden from assistive tech
const SKELETON_KEYS = ['s1', 's2', 's3', 's4'] as const

<ul aria-hidden="true">
  {SKELETON_KEYS.map((key) => <li key={key} />)}
</ul>
```

## Config check before streaming

`error.tsx` cannot distinguish error types in production (server error messages are sanitized). Check configuration errors (missing env vars) synchronously in the page before the Suspense boundaries, so a meaningful UI can be returned without reaching the error boundary:

```tsx
export default function DashboardPage() {
  if (!process.env.PSN_NPSSO) {
    return <ErrorState title="Configuration Incomplete" ... />
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <Section />
    </Suspense>
  )
}
```
