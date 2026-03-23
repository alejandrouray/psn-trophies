import { ViewportPrefetch } from '@components/shared'
import { Badge, Button } from '@components/ui'
import { cn } from '@lib'
import { Clock, Trophy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type {
  GameCardFooterProps,
  GameCardHeaderProps,
  GameCardImageProps,
  GameCardProps,
} from './GameCard.types'

function GameCardImage({ src, alt, priority }: GameCardImageProps) {
  return (
    <figure
      className="relative aspect-4/5 w-full shrink-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 60%, transparent 100%)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        fill
        className="object-top transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-card via-card/90 to-transparent z-10" />
    </figure>
  )
}

function GameCardHeader({ title, lastUpdated, dateRaw }: GameCardHeaderProps) {
  return (
    <header className="space-y-1 mb-6">
      <h3 className="text-2xl font-bold text-foreground tracking-tight leading-tight">
        {title}
      </h3>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Clock className="w-3 h-3" aria-hidden="true" />
        <time
          dateTime={dateRaw}
          className="text-[10px] font-mono uppercase tracking-widest"
        >
          {lastUpdated}
        </time>
      </div>
    </header>
  )
}

function GameCardFooter({ progress, platforms, npCommunicationId }: GameCardFooterProps) {
  return (
    <footer className="mt-auto space-y-5">
      <div className="flex items-center justify-between">
        <section
          className="flex items-center gap-2 bg-secondary/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-border"
          aria-label={`${progress}% completed`}
        >
          <Trophy
            className="w-3.5 h-3.5 text-yellow-500 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]"
            aria-hidden="true"
          />
          <span className="text-[10px] text-foreground font-bold tracking-wider">
            {progress}%
          </span>
        </section>

        <div className="flex gap-1.5">
          {platforms.map((platform) => (
            <Badge
              key={platform}
              variant="outline"
              className="border-border text-muted-foreground text-[9px] uppercase tracking-widest bg-background/20 px-2 py-0.5"
            >
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      <div
        className="relative h-1.5 w-full rounded-full bg-secondary/50 border border-border overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full bg-primary transition-all duration-1000 ease-out rounded-full relative',
            'shadow-[0_0_15px_rgba(0,87,184,0.8)]',
            'before:absolute before:top-0 before:left-0 before:h-1px before:w-full before:bg-white/20',
            'after:absolute after:inset-0 after:bg-accent after:blur-xs after:opacity-40',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <Button variant="psn" size="lg" className="w-full" asChild>
        <Link prefetch href={`/games/${npCommunicationId}`}>
          View Trophies
        </Link>
      </Button>
    </footer>
  )
}

export function GameCard({ game, index }: GameCardProps) {
  const isPriority = index < 6
  const lastUpdated = new Date(game.lastUpdatedDateTime).toLocaleDateString()

  return (
    <div
      className="relative transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 ease-out group animate-in fade-in zoom-in-95 h-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="relative flex flex-col h-full w-full bg-card rounded-[24px] overflow-hidden border border-border group-hover:border-primary/20 transition-colors duration-300">
        <ViewportPrefetch href={`/games/${game.npCommunicationId}`} />
        <GameCardImage
          src={game.trophyTitleIconUrl}
          alt={`Cover of ${game.trophyTitleName}`}
          priority={isPriority}
        />

        <div className="flex flex-col flex-1 p-8 pt-0 -mt-18 z-10 relative">
          <GameCardHeader
            title={game.trophyTitleName}
            lastUpdated={lastUpdated}
            dateRaw={game.lastUpdatedDateTime}
          />
          <GameCardFooter
            progress={game.progress}
            platforms={game.trophyTitlePlatform?.split(',') ?? []}
            npCommunicationId={game.npCommunicationId}
          />
        </div>

      </article>
    </div>
  )
}
