import type { PSNPlatform } from '@types'
import { PLATFORM_CONFIG } from './Profile.constants'
import type { ProfilePlatformBreakdownProps } from './Profile.types'

export function ProfilePlatformBreakdown({
  titles,
}: ProfilePlatformBreakdownProps) {
  const counts = titles
    .flatMap((t) =>
      (t.trophyTitlePlatform?.split(',') ?? []).map((p) => p.trim() as PSNPlatform),
    )
    .filter((p) => p in PLATFORM_CONFIG)
    .reduce<Partial<Record<PSNPlatform, number>>>((acc, p) => {
      acc[p] = (acc[p] ?? 0) + 1
      return acc
    }, {})

  const entries = (Object.entries(counts) as [PSNPlatform, number][]).filter(
    ([, count]) => count > 0,
  )

  if (entries.length === 0) return null

  const max = Math.max(...entries.map(([, c]) => c))

  return (
    <section aria-labelledby="platforms-heading">
      <h2
        id="platforms-heading"
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
      >
        Platforms
      </h2>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        {entries.map(([platform, count]) => {
          const { label, color } = PLATFORM_CONFIG[platform]
          const pct = Math.round((count / max) * 100)
          const ofTotal = Math.round((count / titles.length) * 100)

          return (
            <div key={platform} className="flex items-center gap-4">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest w-10 shrink-0 text-right"
                style={{ color }}
              >
                {label}
              </span>

              <div className="flex-1 relative h-6 rounded-full bg-secondary/40 border border-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}99, ${color})`,
                    boxShadow: `0 0 10px ${color}66`,
                  }}
                />
                <span className="absolute inset-0 flex items-center px-3 text-[10px] font-mono font-semibold">
                  {count} {count === 1 ? 'game' : 'games'}
                </span>
              </div>

              <span className="text-[10px] font-mono text-muted-foreground w-9 shrink-0 text-right tabular-nums">
                {ofTotal}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
