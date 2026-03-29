export function ProfileSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="h-56 rounded-3xl bg-secondary/50 animate-pulse" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['s1', 's2', 's3', 's4'] as const).map((k) => (
          <div
            key={k}
            className="h-32 rounded-2xl bg-secondary/50 animate-pulse"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start">
        <div className="flex flex-col gap-8">
          <div className="h-48 rounded-2xl bg-secondary/50 animate-pulse" />
          <div className="space-y-3">
            {(['b1', 'b2', 'b3'] as const).map((k) => (
              <div
                key={k}
                className="h-16 rounded-2xl bg-secondary/50 animate-pulse"
              />
            ))}
          </div>
          <div className="h-36 rounded-2xl bg-secondary/50 animate-pulse" />
        </div>
        <div className="space-y-3">
          {(['a1', 'a2', 'a3', 'a4', 'a5', 'a6'] as const).map((k) => (
            <div
              key={k}
              className="h-16 rounded-2xl bg-secondary/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
