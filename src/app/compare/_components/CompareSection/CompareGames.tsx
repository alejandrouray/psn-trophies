import { cn } from '@lib'
import type { ComparedGame } from '@types'
import Image from 'next/image'
import Link from 'next/link'

interface ProgressRowProps {
  label: string
  progress: number
  color: 'blue' | 'rose'
}

function ProgressRow({ label, progress, color }: ProgressRowProps) {
  const trackColor = color === 'blue' ? 'bg-primary' : 'bg-rose-500'
  const glowColor =
    color === 'blue'
      ? 'shadow-[0_0_8px_rgba(0,87,184,0.6)]'
      : 'shadow-[0_0_8px_rgba(244,63,94,0.6)]'

  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-[10px] font-mono text-muted-foreground shrink-0">
        {label}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full bg-secondary/50 border border-border overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} ${progress}%`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            trackColor,
            glowColor,
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="w-8 text-right text-[10px] font-mono font-semibold tabular-nums shrink-0">
        {progress}%
      </span>
    </div>
  )
}

interface GameRowProps {
  game: ComparedGame
  myLabel: string
  theirLabel: string
}

function GameRow({ game, myLabel, theirLabel }: GameRowProps) {
  const diff = game.myProgress - game.theirProgress
  const diffLabel = diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : 'Tied'
  const diffColor =
    diff > 0
      ? 'text-primary'
      : diff < 0
        ? 'text-rose-400'
        : 'text-muted-foreground'

  return (
    <li className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors">
      <div className="relative size-12 rounded-lg overflow-hidden shrink-0">
        <Image
          src={game.iconUrl}
          alt={`Cover of ${game.name}`}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/games/${game.npCommunicationId}`}
            className="text-sm font-semibold truncate hover:underline underline-offset-2"
          >
            {game.name}
          </Link>
          <span
            className={cn('text-xs font-bold tabular-nums shrink-0', diffColor)}
          >
            {diffLabel}
          </span>
        </div>
        <ProgressRow label="Me" progress={game.myProgress} color="blue" />
        <ProgressRow
          label={theirLabel.slice(0, 3)}
          progress={game.theirProgress}
          color="rose"
        />
      </div>
    </li>
  )
}

interface CompareGamesProps {
  commonGames: ComparedGame[]
  theirOnlineId: string
}

export function CompareGames({
  commonGames,
  theirOnlineId,
}: CompareGamesProps) {
  if (commonGames.length === 0) {
    return (
      <section
        aria-label="Common games"
        className="flex flex-col items-center gap-4 py-16 text-center"
      >
        <span className="text-5xl" aria-hidden="true">
          🎮
        </span>
        <p className="text-lg font-semibold">No games in common</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          You and {theirOnlineId} haven't played any of the same games yet.
        </p>
      </section>
    )
  }

  return (
    <section aria-label="Common games">
      <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
        Common games
        <span className="ml-2 text-foreground font-bold">
          ({commonGames.length})
        </span>
      </h2>
      <ul className="space-y-3 list-none">
        {commonGames.map((game) => (
          <GameRow
            key={game.npCommunicationId}
            game={game}
            myLabel="Me"
            theirLabel={theirOnlineId}
          />
        ))}
      </ul>
    </section>
  )
}
