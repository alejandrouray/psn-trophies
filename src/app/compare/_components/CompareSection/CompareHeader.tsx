import { PSNAvatar, TrophyCounts } from '@components/psn'
import { Badge } from '@components/ui'
import { TIER_GRADE, tierMix, resolveAvatarUrl } from '@lib'
import type { ComparedUser } from '@types'

interface PlayerCardProps {
  user: ComparedUser
  align: 'left' | 'right'
}

function PlayerCard({ user, align }: PlayerCardProps) {
  const { trophyLevel, progress, tier, earnedTrophies } = user.trophySummary
  const grade = TIER_GRADE(tier)
  const onlineId = user.profile?.onlineId ?? 'Unknown Player'
  const isPlus = user.profile?.isPlus ?? false
  const avatarUrl = user.profile ? resolveAvatarUrl(user.profile) : undefined

  return (
    <div
      className="relative flex-1 rounded-2xl border border-border bg-card overflow-hidden p-6"
      style={{
        background: `radial-gradient(ellipse 70% 100% at ${align === 'left' ? '0%' : '100%'} 50%, ${tierMix(grade, 8)}, transparent)`,
      }}
    >
      <div
        className={`flex flex-col gap-4 items-center text-center`}
      >
        <PSNAvatar avatarUrl={avatarUrl} onlineId={onlineId} grade={grade} size="lg" />

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xl font-bold tracking-tight">{onlineId}</span>
            {isPlus && (
              <Badge
                variant="outline"
                className="text-[9px] h-4 px-1.5 py-0 border-blue-600/40 bg-blue-600/10 text-blue-400"
              >
                PS+
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            Level{' '}
            <span
              className="font-bold"
              style={{ color: `var(--color-trophy-${grade})` }}
            >
              {trophyLevel}
            </span>
            {' · '}
            <span className="tabular-nums">{progress}%</span>
          </p>
        </div>

        <TrophyCounts earnedTrophies={earnedTrophies} size="sm" />
      </div>
    </div>
  )
}

interface CompareHeaderProps {
  me: ComparedUser
  them: ComparedUser
}

export function CompareHeader({ me, them }: CompareHeaderProps) {
  return (
    <section aria-label="Player comparison" className="flex items-stretch gap-4">
      <PlayerCard user={me} align="left" />

      <div className="flex items-center justify-center px-2 shrink-0">
        <span
          className="text-2xl font-black tracking-widest text-muted-foreground/40 uppercase"
          aria-hidden="true"
        >
          vs
        </span>
      </div>

      <PlayerCard user={them} align="right" />
    </section>
  )
}
