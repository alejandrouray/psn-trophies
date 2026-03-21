import { Badge } from '@components'
import Image from 'next/image'
import type { DashboardHeaderProps } from './DashboardHeader.types'

const TIER_GRADE = (tier: number) => {
  if (tier <= 3) return 'bronze'
  if (tier <= 6) return 'silver'
  if (tier <= 9) return 'gold'
  return 'platinum'
}

const TIER_COLOR: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#B0C4DE',
}

const TIER_LABEL: Record<string, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
}

const TROPHY_TYPES = [
  { key: 'platinum', label: 'Platinum', color: '#B0C4DE', icon: '🏆' },
  { key: 'gold', label: 'Gold', color: '#FFD700', icon: '🥇' },
  { key: 'silver', label: 'Silver', color: '#C0C0C0', icon: '🥈' },
  { key: 'bronze', label: 'Bronze', color: '#CD7F32', icon: '🥉' },
] as const

export function DashboardHeader({ profile, trophySummary }: DashboardHeaderProps) {
  const { trophyLevel, progress, tier, earnedTrophies } = trophySummary

  const grade = TIER_GRADE(tier)
  const tierColor = TIER_COLOR[grade]
  const tierLabel = TIER_LABEL[grade]
  const nextLevel = Number(trophyLevel) + 1

  const onlineId = profile?.onlineId ?? 'PlayStation User'
  const isPlus = profile?.isPlus ?? false
  const avatarUrl =
    profile?.avatars.find((a) => a.size === 'xl')?.url ??
    profile?.avatars.find((a) => a.size === 'l')?.url ??
    profile?.avatars[profile.avatars.length - 1]?.url

  return (
    <section
      aria-label={`${onlineId}'s PlayStation profile`}
      className="relative w-full rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 120% at 0% 50%, ${tierColor}10, transparent)`,
        }}
        aria-hidden="true"
        role="presentation"
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
        <div className="flex items-center gap-4 shrink-0">
          <div
            className="rounded-full p-[2px] shrink-0"
            style={{
              background: `linear-gradient(135deg, ${tierColor}, ${tierColor}30)`,
              boxShadow: `0 0 24px ${tierColor}25`,
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
          <div className="flex items-baseline gap-2">
            <span
              className="text-5xl font-extrabold tracking-tighter tabular-nums"
              style={{ color: tierColor }}
            >
              {trophyLevel}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
              style={{
                color: tierColor,
                borderColor: `${tierColor}40`,
                background: `${tierColor}12`,
              }}
            >
              {tierLabel}
            </span>
          </div>

          <div
            className="relative h-1.5 w-full rounded-full bg-secondary border border-border overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% progress to level ${nextLevel}`}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${tierColor}70, ${tierColor})`,
                boxShadow: `0 0 8px ${tierColor}50`,
              }}
            />
          </div>

          <p className="text-muted-foreground font-mono text-[10px]">
            {progress}% · Lv. {nextLevel}
          </p>
        </div>

        <div
          className="hidden md:block w-px self-stretch bg-border"
          aria-hidden="true"
        />

        <div className="flex items-center gap-5 md:gap-8 flex-wrap">
          {TROPHY_TYPES.map(({ key, label, color, icon }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
              <span
                className="text-2xl font-extrabold tabular-nums tracking-tight"
                style={{ color }}
              >
                {Number(
                  earnedTrophies[key as keyof typeof earnedTrophies],
                ).toLocaleString()}
              </span>
              <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
