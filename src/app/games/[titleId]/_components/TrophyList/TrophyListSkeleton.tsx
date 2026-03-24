import { SKELETON_KEYS } from './TrophyList.constants'

export function TrophyListSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="h-52 rounded-3xl bg-secondary/50 animate-pulse" />

      <div className="flex gap-2">
        {(['f1', 'f2', 'f3'] as const).map((k) => (
          <div
            key={k}
            className="h-9 w-28 rounded-full bg-secondary/50 animate-pulse"
          />
        ))}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
        {SKELETON_KEYS.map((k) => (
          <li
            key={k}
            className="h-[88px] rounded-2xl bg-secondary/50 animate-pulse"
          />
        ))}
      </ul>
    </div>
  )
}
