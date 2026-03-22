import { formatCount, TROPHY_TYPES } from '@lib'
import { SIZE } from './TrophyCounts.constants'
import type { TrophyCountsProps } from './TrophyCounts.types'

export function TrophyCounts({ earnedTrophies, size = 'sm' }: TrophyCountsProps) {
  const s = SIZE[size]

  return (
    <ul className={`flex items-center flex-wrap list-none ${s.gap}`}>
      {TROPHY_TYPES.map(({ key, label, color, icon }) => (
        <li key={key} className={`flex flex-col items-center ${s.li}`}>
          <span className={s.icon} aria-hidden="true">
            {icon}
          </span>
          <span
            className={`${s.count} font-extrabold tabular-nums tracking-tight`}
            style={{ color }}
          >
            {formatCount(earnedTrophies[key])}
          </span>
          <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">
            {label}
          </span>
        </li>
      ))}
    </ul>
  )
}
