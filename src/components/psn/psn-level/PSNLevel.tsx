import { Badge, Progress } from '@components/ui'
import { TIER_LABEL, tierCssVar, tierMix } from '@lib'
import type { PSNLevelProps } from './PSNLevel.types'

export function PSNLevel({
  trophyLevel,
  progress,
  tier,
  grade,
  variant = 'compact',
}: PSNLevelProps) {
  const color = tierCssVar(grade)
  const nextLevel = Number(trophyLevel) + 1

  return (
    <div className="flex flex-col justify-center gap-4 shrink-0 min-w-[180px]">
      <div className="flex items-center gap-2">
        <span
          className="font-extrabold tracking-tighter tabular-nums"
          style={{
            color,
            fontSize: variant === 'full' ? '3.75rem' : '3rem',
            lineHeight: 1,
          }}
        >
          <span className="sr-only">Level </span>
          {trophyLevel}
        </span>

        <div className="space-y-1">
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-widest block"
            style={{
              color,
              borderColor: tierMix(grade, variant === 'full' ? 30 : 25),
              background: tierMix(grade, variant === 'full' ? 8 : 7),
            }}
          >
            {TIER_LABEL[grade]}
          </Badge>
          {variant === 'full' && (
            <p className="text-muted-foreground font-mono text-[10px]">
              Tier {tier} / 10
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Progress
          value={progress}
          aria-label={`${progress}% progress to level ${nextLevel}`}
          indicatorStyle={{
            background: `linear-gradient(90deg, ${tierMix(grade, variant === 'full' ? 50 : 44)}, ${color})`,
            boxShadow: `0 0 8px ${tierMix(grade, variant === 'full' ? 35 : 31)}`,
          }}
        />
        <p className="text-muted-foreground font-mono text-[10px]">
          {progress}%{' '}
          {variant === 'full'
            ? `· Next: Lv. ${nextLevel}`
            : `· Lv. ${nextLevel}`}
        </p>
      </div>
    </div>
  )
}
