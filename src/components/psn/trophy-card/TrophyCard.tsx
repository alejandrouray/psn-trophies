import { cn, TIER_LABEL } from '@lib'
import { Check, Lock } from 'lucide-react'
import Image from 'next/image'
import { TIER_STYLES } from './TrophyCard.constants'
import type { TrophyCardProps } from './TrophyCard.types'

export function TrophyCard({
  trophy,
  spoilerRevealed = false,
}: TrophyCardProps) {
  const tier = TIER_STYLES[trophy.type]
  const isHiddenUnearned = trophy.hidden && !trophy.earned
  const masked = isHiddenUnearned && !spoilerRevealed

  const displayName = masked ? 'Hidden Trophy' : trophy.name

  const displayDescription = masked
    ? 'Earn this trophy to reveal its secret.'
    : trophy.description

  return (
    <article
      className={cn(
        'relative flex items-start gap-4 p-4 rounded-2xl border border-border h-full',
        'bg-card transition-all duration-300',
        'hover:border-primary/20 hover:shadow-md',
        trophy.earned && [tier.glow, tier.earnedBorder],
      )}
    >
      <div className="relative shrink-0">
        {trophy.iconUrl && !masked ? (
          <div className="relative w-[60px] h-[60px] rounded-xl overflow-hidden">
            <Image
              src={trophy.iconUrl}
              alt=""
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>
        ) : (
          <div className="w-[60px] h-[60px] rounded-xl bg-secondary flex items-center justify-center">
            <Lock
              className="w-5 h-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}

        {trophy.earned && (
          <div
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-card"
            aria-hidden="true"
          >
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-1">
            {displayName}
            {!trophy.earned && <span className="sr-only"> (not earned)</span>}
          </h3>
          <span
            className={cn(
              'shrink-0 text-[9px] font-bold uppercase tracking-widest',
              'px-2 py-0.5 rounded-full border',
              tier.badge,
            )}
            aria-hidden="true"
          >
            {TIER_LABEL[trophy.type]}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-2 flex-1">
          {displayDescription}
        </p>

        <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/70">
          {trophy.earned && trophy.earnedDateTime && (
            <time dateTime={trophy.earnedDateTime}>
              {new Date(trophy.earnedDateTime).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
          {trophy.earnedRate && (
            <span>
              <span className="sr-only">Earned by </span>
              {Number.parseFloat(trophy.earnedRate).toFixed(1)}%
              <span className="sr-only"> of players</span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
