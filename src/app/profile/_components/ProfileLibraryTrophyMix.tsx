import { formatCount, TROPHY_TYPES } from '@lib'
import {
  aggregateLibraryEarnedTotals,
  LIBRARY_MIX_KEYS,
  type LibraryMixKey,
} from './Profile.constants'
import type { ProfileLibraryTrophyMixProps } from './Profile.types'

function mixMeta(key: LibraryMixKey) {
  return TROPHY_TYPES.find((t) => t.key === key)!
}

export function ProfileLibraryTrophyMix({ titles }: ProfileLibraryTrophyMixProps) {
  const totals = aggregateLibraryEarnedTotals(titles)
  const sum = LIBRARY_MIX_KEYS.reduce((s, k) => s + totals[k], 0)

  if (sum === 0) {
    return null
  }

  const mixLabel = LIBRARY_MIX_KEYS.map(
    (k) => `${mixMeta(k).label} ${totals[k]}`,
  ).join(', ')

  return (
    <section aria-labelledby="library-mix-heading">
      <h2
        id="library-mix-heading"
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
      >
        Library trophy mix
      </h2>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Earned trophies summed across the titles loaded here — not your full
          PSN totals (those are in the header).
        </p>

        <div
          className="flex h-3 w-full rounded-full overflow-hidden border border-border"
          role="img"
          aria-label={`Trophy distribution in loaded library: ${mixLabel}`}
        >
          {LIBRARY_MIX_KEYS.map((key) => {
            const count = totals[key]
            if (count === 0) return null
            const { color } = mixMeta(key)

            return (
              <div
                key={key}
                className="min-w-px h-full transition-all duration-500"
                style={{ flexGrow: count, backgroundColor: color }}
              />
            )
          })}
        </div>

        <ul className="grid grid-cols-2 gap-3 list-none">
          {LIBRARY_MIX_KEYS.map((key) => {
            const meta = mixMeta(key)
            const count = totals[key]

            return (
              <li
                key={key}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
              >
                <span aria-hidden="true">{meta.icon}</span>
                <span style={{ color: meta.color }} className="font-bold tabular-nums">
                  {formatCount(count)}
                </span>
                <span className="text-muted-foreground truncate">{meta.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
