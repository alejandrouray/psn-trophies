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
