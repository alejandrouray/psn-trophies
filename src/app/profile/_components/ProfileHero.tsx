import { Badge } from '@components'
import { PSNAvatar, PSNLevel, TrophyCounts } from '@components/psn'
import { resolveAvatarUrl, TIER_GRADE, tierMix } from '@lib'
import type { ProfileHeroProps } from './Profile.types'

export function ProfileHero({ profile, trophySummary }: ProfileHeroProps) {
  const { trophyLevel, progress, tier, earnedTrophies } = trophySummary

  const grade = TIER_GRADE(tier)

  const onlineId = profile?.onlineId ?? 'PlayStation User'
  const avatarUrl = profile ? resolveAvatarUrl(profile) : undefined
  const aboutMe = profile?.aboutMe

  return (
    <section
      aria-label={`${onlineId}'s profile`}
      className="relative w-full rounded-3xl border border-border bg-card overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 140% at 0% 50%, ${tierMix(grade, 10)}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col md:flex-row gap-8 p-8 md:p-10">
        <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
          <PSNAvatar
            avatarUrl={avatarUrl}
            onlineId={onlineId}
            grade={grade}
            size="lg"
          />

          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <h1 className="text-2xl font-bold tracking-tight">{onlineId}</h1>
              {profile?.isPlus && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-4 px-1.5 py-0 border-blue-600/40 bg-blue-600/10 text-blue-400"
                >
                  PS+
                </Badge>
              )}
            </div>
            {aboutMe && (
              <p className="text-sm text-muted-foreground max-w-xs">
                {aboutMe}
              </p>
            )}
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
          variant="full"
        />

        <div
          className="hidden md:block w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <div className="flex-1 flex items-center justify-center">
          <TrophyCounts earnedTrophies={earnedTrophies} size="lg" />
        </div>
      </div>
    </section>
  )
}
