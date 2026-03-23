const GAME_SKELETON_KEYS = ['gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6'] as const

function PlayerCardSkeleton() {
  return (
    <div className="flex-1 rounded-2xl border border-border bg-card p-6 animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="size-20 rounded-full bg-muted" />
        <div className="space-y-2 w-full flex flex-col items-center">
          <div className="h-5 w-32 rounded-md bg-muted" />
          <div className="h-3 w-20 rounded-md bg-muted" />
        </div>
        <div className="flex gap-3">
          {['s1', 's2', 's3', 's4'].map((k) => (
            <div key={k} className="h-8 w-10 rounded-md bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 list-none animate-pulse">
      {['s1', 's2', 's3', 's4'].map((k) => (
        <li key={k} className="rounded-xl border border-border bg-card px-4 py-5 flex flex-col items-center gap-2">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-7 w-24 rounded bg-muted" />
        </li>
      ))}
    </ul>
  )
}

export function CompareSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="flex items-stretch gap-4">
        <PlayerCardSkeleton />
        <div className="flex items-center justify-center px-2">
          <div className="h-8 w-8 rounded bg-muted" />
        </div>
        <PlayerCardSkeleton />
      </div>

      <StatsSkeleton />

      <ul className="space-y-3 list-none animate-pulse">
        {GAME_SKELETON_KEYS.map((k) => (
          <li key={k} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="size-12 rounded-lg bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
