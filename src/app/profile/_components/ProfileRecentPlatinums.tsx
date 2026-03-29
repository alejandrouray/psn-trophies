import { cn, tierMix, TIER_GRADES } from '@lib'
import Image from 'next/image'
import Link from 'next/link'
import { selectRecentPlatinumTitles } from './Profile.constants'
import type { ProfileRecentPlatinumsProps } from './Profile.types'

export function ProfileRecentPlatinums({
  titles,
}: ProfileRecentPlatinumsProps) {
  const platinums = selectRecentPlatinumTitles(titles)

  if (platinums.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="recent-platinums-heading">
      <h2
        id="recent-platinums-heading"
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
      >
        Recent platinums
      </h2>

      <ul className="flex flex-col gap-3 list-none">
        {platinums.map((title) => {
          const platforms =
            title.trophyTitlePlatform?.split(',').map((p) => p.trim()) ?? []
          const completedAt = new Date(
            title.lastUpdatedDateTime,
          ).toLocaleDateString()

          return (
            <li key={title.npCommunicationId}>
              <Link
                href={`/games/${title.npCommunicationId}`}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-2xl border bg-card',
                  'hover:shadow-md transition-all duration-300 group',
                )}
                style={{
                  borderColor: tierMix(TIER_GRADES.PLATINUM, 38),
                }}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10">
                  <Image
                    src={title.trophyTitleIconUrl}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="48px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate flex items-center gap-2">
                    <span className="shrink-0" aria-hidden="true">
                      🏆
                    </span>
                    {title.trophyTitleName}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    {platforms.join(' · ')}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Completed
                  </p>
                  <time
                    dateTime={title.lastUpdatedDateTime}
                    className="text-xs font-semibold tabular-nums"
                  >
                    {completedAt}
                  </time>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
