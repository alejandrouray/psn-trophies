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

# Code breathing room

Functions and blocks must breathe. Use blank lines to separate logical steps within a function — guard clauses, main logic, and return value are distinct stages.

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

Purely decorative elements (background layers, visual symbols, icons without text) must be hidden from assistive technology:

```tsx
// ❌ BAD — screen reader announces "triangle circle cross square"
<div>
  <span>△</span>
  <span>○</span>
</div>

// ✅ GOOD — hidden from assistive technology
<div aria-hidden="true" role="presentation">
  <span aria-hidden="true">△</span>
  <span aria-hidden="true">○</span>
</div>
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
