const SKELETON_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const

function GameCardSkeleton() {
  return (
    <div className="relative animate-pulse">
      <article className="relative flex flex-col h-full w-full bg-card rounded-[24px] overflow-hidden">
        <div className="aspect-4/5 w-full bg-muted" />
        <div className="flex flex-col flex-1 p-8 pt-0 -mt-18 z-10 relative space-y-4">
          <div className="h-7 w-4/5 rounded-md bg-muted" />
          <div className="h-3 w-1/3 rounded-md bg-muted" />
          <div className="mt-auto space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-14 rounded-full bg-muted" />
              <div className="h-5 w-10 rounded-full bg-muted" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted" />
            <div className="h-10 w-full rounded-lg bg-muted" />
          </div>
        </div>
      </article>
    </div>
  )
}

export function GamesGridSkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 list-none">
      {SKELETON_KEYS.map((key) => (
        <li key={key}>
          <GameCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
