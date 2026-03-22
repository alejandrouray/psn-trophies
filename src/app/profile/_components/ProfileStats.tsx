import { STAT_KEYS } from './Profile.constants'
import type { ProfileStatsProps } from './Profile.types'

export function ProfileStats(props: ProfileStatsProps) {
  return (
    <section aria-labelledby="stats-heading">
      <h2
        id="stats-heading"
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
      >
        Trophy Stats
      </h2>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none">
        {STAT_KEYS.map(({ label, icon, getValue }) => (
          <li
            key={label}
            className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-border bg-card text-center"
          >
            <span className="text-3xl" aria-hidden="true">
              {icon}
            </span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tight">
              {getValue(props)}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
