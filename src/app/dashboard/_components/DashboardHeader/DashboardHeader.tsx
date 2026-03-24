import { Badge } from '@components'
import { PSNAvatar, PSNLevel, TrophyCounts } from '@components/psn'
import { resolveAvatarUrl, TIER_GRADE, tierMix } from '@lib'
import Link from 'next/link'
import type { DashboardHeaderProps } from './DashboardHeader.types'

export function DashboardHeader({
  profile,
  trophySummary,
}: DashboardHeaderProps) {
  const { trophyLevel, progress, tier, earnedTrophies } = trophySummary

  const grade = TIER_GRADE(tier)

  const onlineId = profile?.onlineId ?? 'PlayStation User'
  const isPlus = profile?.isPlus ?? false
  const avatarUrl = profile ? resolveAvatarUrl(profile) : undefined

  return (
    <section
      aria-label={`${onlineId}'s PlayStation profile`}
      className="relative w-full rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 120% at 0% 50%, ${tierMix(grade, 6)}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/profile"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 hover:opacity-90 transition-opacity"
            aria-label={`View ${onlineId}'s profile`}
          >
            <PSNAvatar
              avatarUrl={avatarUrl}
              onlineId={onlineId}
              grade={grade}
              size="sm"
            />
          </Link>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/profile"
                className="hover:underline underline-offset-2"
              >
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                  {onlineId}
                </h2>
              </Link>
              {isPlus && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-4 px-1.5 py-0 border-blue-600/40 bg-blue-600/10 text-blue-400"
                >
                  PS+
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.35em]">
              PlayStation Network
            </p>
          </div>
        </div>

        <div
          className="hidden md:block w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <PSNLevel
          trophyLevel={trophyLevel}
          progress={progress}
          tier={tier}
          grade={grade}
          variant="compact"
        />

        <div
          className="hidden md:block w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <TrophyCounts earnedTrophies={earnedTrophies} size="sm" />
      </div>
    </section>
  )
}
