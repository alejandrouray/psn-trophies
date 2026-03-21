import { Badge } from '@components'
import { formatCount, resolveAvatarUrl } from '@lib'
import Image from 'next/image'
import {
  TIER_GRADE,
  TIER_LABEL,
  TROPHY_TYPES,
  tierCssVar,
  tierMix,
} from './DashboardHeader.constants'
import type { DashboardHeaderProps } from './DashboardHeader.types'

export function DashboardHeader({
  profile,
  trophySummary,
}: DashboardHeaderProps) {
  const { trophyLevel, progress, tier, earnedTrophies } = trophySummary

  const grade = TIER_GRADE(tier)
  const color = tierCssVar(grade)
  const tierLabel = TIER_LABEL[grade]
  const nextLevel = Number(trophyLevel) + 1

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
          <div
            className="rounded-full p-[2px] shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}, ${tierMix(grade, 19)})`,
              boxShadow: `0 0 24px ${tierMix(grade, 15)}`,
            }}
          >
            <div className="rounded-full overflow-hidden size-16 md:size-20 bg-muted">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${onlineId}'s avatar`}
                  width={80}
                  height={80}
                  className="object-cover size-full"
                  priority
                />
              ) : (
                <div
                  className="size-full flex items-center justify-center text-2xl"
                  aria-hidden="true"
                >
                  🎮
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                {onlineId}
              </h2>
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

        <div className="space-y-2 shrink-0 min-w-[180px]">
          <div className="flex items-center gap-2">
            <span
              className="text-5xl font-extrabold tracking-tighter tabular-nums"
              style={{ color }}
            >
              <span className="sr-only">Level </span>
              {trophyLevel}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{
                color,
                borderColor: tierMix(grade, 25),
                background: tierMix(grade, 7),
              }}
            >
              {tierLabel}
            </Badge>
          </div>

          <div
            className="relative h-1.5 w-full rounded-full bg-secondary border border-border overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% progress to level ${nextLevel}`}
          >
            {progress > 0 && (
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                  minWidth: '4px',
                  background: `linear-gradient(90deg, ${tierMix(grade, 44)}, ${color})`,
                  boxShadow: `0 0 8px ${tierMix(grade, 31)}`,
                }}
              />
            )}
          </div>

          <p className="text-muted-foreground font-mono text-[10px]">
            {progress}% · Lv. {nextLevel}
          </p>
        </div>

        <div
          className="hidden md:block w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <ul className="flex items-center gap-5 md:gap-8 flex-wrap list-none">
          {TROPHY_TYPES.map(({ key, label, color: trophyColor, icon }) => (
            <li key={key} className="flex flex-col items-center gap-1">
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
              <span
                className="text-2xl font-extrabold tabular-nums tracking-tight"
                style={{ color: trophyColor }}
              >
                {formatCount(earnedTrophies[key])}
              </span>
              <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
