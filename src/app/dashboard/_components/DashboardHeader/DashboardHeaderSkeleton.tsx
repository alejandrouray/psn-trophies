export function DashboardHeaderSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">

        <div className="flex items-center gap-4 shrink-0">
          <div className="size-16 md:size-20 rounded-full bg-muted shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-36 rounded-md bg-muted" />
            <div className="h-3 w-28 rounded-md bg-muted" />
          </div>
        </div>

        <div className="hidden md:block w-px self-stretch bg-border" />

        <div className="space-y-3 shrink-0 min-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="h-12 w-20 rounded-md bg-muted" />
            <div className="h-5 w-14 rounded-full bg-muted" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-3 w-20 rounded-md bg-muted" />
        </div>

        <div className="hidden md:block w-px self-stretch bg-border" />

        <ul className="flex items-center gap-5 md:gap-8 flex-wrap list-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex flex-col items-center gap-1.5">
              <div className="size-6 rounded bg-muted" />
              <div className="h-7 w-10 rounded-md bg-muted" />
              <div className="h-2.5 w-8 rounded bg-muted" />
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
