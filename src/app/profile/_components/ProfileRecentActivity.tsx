import { cn } from '@lib'
import Image from 'next/image'
import Link from 'next/link'
import { RECENT_LIMIT } from './Profile.constants'
import type { ProfileRecentActivityProps } from './Profile.types'

export function ProfileRecentActivity({ titles }: ProfileRecentActivityProps) {
  const recent = [...titles]
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedDateTime).getTime() -
        new Date(a.lastUpdatedDateTime).getTime(),
    )
    .slice(0, RECENT_LIMIT)

  return (
    <section aria-labelledby="activity-heading">
      <h2
        id="activity-heading"
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
      >
        Recent Activity
      </h2>

      <ul className="flex flex-col gap-3 list-none">
        {recent.map((title) => {
          const platforms =
            title.trophyTitlePlatform?.split(',').map((p) => p.trim()) ?? []

          return (
            <li key={title.npCommunicationId}>
              <Link
                href={`/games/${title.npCommunicationId}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={title.trophyTitleIconUrl}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="48px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {title.trophyTitleName}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    {platforms.join(' · ')}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-sm font-bold tabular-nums">
                    {title.progress}%
                  </span>
                  <div
                    className="relative h-1 w-20 rounded-full bg-secondary/50 border border-border overflow-hidden"
                    role="progressbar"
                    aria-valuenow={title.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${title.progress}% complete`}
                  >
                    <div
                      className={cn(
                        'h-full bg-primary rounded-full',
                        'shadow-[0_0_6px_rgba(0,87,184,0.6)]',
                      )}
                      style={{ width: `${title.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
