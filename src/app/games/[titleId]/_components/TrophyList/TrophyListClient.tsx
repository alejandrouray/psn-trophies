'use client'

import { Badge, Button, TrophyCard } from '@components'
import { cn, TROPHY_TYPES } from '@lib'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  applyFilter,
  TROPHY_FILTER_OPTIONS,
  TROPHY_FILTERS,
} from './TrophyList.constants'
import type { TrophyFilter, TrophyListClientProps } from './TrophyList.types'

export function TrophyListClient({
  game,
  trophies,
  groups,
  totalCount,
  earnedCount,
}: TrophyListClientProps) {
  const [filter, setFilter] = useState<TrophyFilter>(TROPHY_FILTERS.ALL)
  const [groupId, setGroupId] = useState<string | null>(null)
  const [spoilerRevealed, setSpoilerRevealed] = useState(false)

  const hiddenUnearnedCount = trophies.filter(
    (t) => t.hidden && !t.earned,
  ).length

  const filtered = applyFilter(trophies, filter, groupId)
  const platforms =
    game.trophyTitlePlatform?.split(',').map((p) => p.trim()) ?? []

  const countByType = (type: string) => ({
    defined:
      game.definedTrophies[type as keyof typeof game.definedTrophies] ?? 0,
    earned: game.earnedTrophies[type as keyof typeof game.earnedTrophies] ?? 0,
  })

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="game-title"
        className="relative overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="flex items-start gap-6 p-6 md:p-8">
          <div className="relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={game.trophyTitleIconUrl}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {platforms.map((p) => (
                <Badge
                  key={p}
                  variant="outline"
                  className="text-[9px] uppercase tracking-widest border-border text-muted-foreground"
                >
                  {p}
                </Badge>
              ))}
            </div>

            <h2
              id="game-title"
              className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 line-clamp-2"
            >
              {game.trophyTitleName}
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {TROPHY_TYPES.map(({ key, icon, label }) => {
                  const { defined, earned } = countByType(key)
                  return (
                    <div key={key} className="flex items-center gap-1">
                      <span aria-hidden="true">{icon}</span>
                      <span className="text-xs font-mono text-foreground">
                        <span className="sr-only">{label}: </span>
                        {earned}
                        <span className="text-muted-foreground">
                          /{defined}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground ml-auto">
                <span className="sr-only">
                  {earnedCount} of {totalCount} trophies earned
                </span>
                <span className="text-foreground font-bold" aria-hidden="true">
                  {earnedCount}
                </span>
                <span aria-hidden="true">/</span>
                <span aria-hidden="true">{totalCount}</span>
              </div>
            </div>

            <div
              className="relative mt-3 h-1.5 w-full rounded-full bg-secondary/50 border border-border overflow-hidden"
              role="progressbar"
              aria-valuenow={game.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${game.progress}% complete`}
            >
              <div
                className={cn(
                  'h-full bg-primary transition-all duration-1000 ease-out rounded-full',
                  'shadow-[0_0_10px_rgba(0,87,184,0.7)]',
                )}
                style={{ width: `${game.progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Trophy list">
        {groups.length > 1 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={groupId === null}
              onClick={() => setGroupId(null)}
              className={cn(
                'rounded-full text-xs font-mono transition-all',
                groupId === null
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              All groups
            </Button>

            {groups.map((group) => (
              <Button
                key={group.id}
                type="button"
                variant="outline"
                size="sm"
                aria-pressed={groupId === group.id}
                onClick={() => setGroupId(group.id)}
                className={cn(
                  'rounded-full text-xs font-mono transition-all gap-1.5',
                  groupId === group.id
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {group.iconUrl && (
                  <Image
                    src={group.iconUrl}
                    alt=""
                    width={14}
                    height={14}
                    className="rounded-sm"
                  />
                )}
                {group.id === 'default' ? 'Base Game' : group.name}
              </Button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {TROPHY_FILTER_OPTIONS.map(({ label, value }) => {
            const count =
              value === TROPHY_FILTERS.ALL
                ? totalCount
                : value === TROPHY_FILTERS.EARNED
                  ? earnedCount
                  : totalCount - earnedCount

            return (
              <Button
                key={value}
                type="button"
                variant="outline"
                size="sm"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={cn(
                  'rounded-full text-xs font-mono transition-all',
                  filter === value
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
                <span className="ml-1.5 tabular-nums">{count}</span>
              </Button>
            )
          })}

          {hiddenUnearnedCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={spoilerRevealed}
              onClick={() => setSpoilerRevealed((v) => !v)}
              className={cn(
                'rounded-full text-xs font-mono ml-auto transition-all gap-1.5',
                spoilerRevealed
                  ? 'text-amber-400 border-amber-500/40 hover:text-amber-300'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {spoilerRevealed ? (
                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {spoilerRevealed ? 'Hide secrets' : 'Reveal secrets'}
              <span className="tabular-nums">({hiddenUnearnedCount})</span>
            </Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <span className="text-5xl" aria-hidden="true">
              🏆
            </span>
            <p className="text-lg font-semibold tracking-tight">
              No trophies found
            </p>
            <p className="text-sm text-muted-foreground">
              {filter === TROPHY_FILTERS.EARNED
                ? "You haven't earned any trophies yet."
                : 'All trophies in this game have been earned!'}
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
            {filtered.map((trophy) => (
              <li key={trophy.id}>
                <TrophyCard trophy={trophy} spoilerRevealed={spoilerRevealed} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
