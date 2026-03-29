import { formatCount } from '@lib'
import type { PSNPlatform } from '@types'
import type { TrophyTitle } from 'psn-api'
import type { ProfileStatsProps } from './Profile.types'

export const RECENT_LIMIT = 6

export const PLATINUM_HIGHLIGHT_LIMIT = 5

export const LIBRARY_MIX_KEYS = [
  'bronze',
  'silver',
  'gold',
  'platinum',
] as const

export type LibraryMixKey = (typeof LIBRARY_MIX_KEYS)[number]

export function aggregateLibraryEarnedTotals(
  titles: TrophyTitle[],
): Record<LibraryMixKey, number> {
  return titles.reduce(
    (acc, t) => ({
      bronze: acc.bronze + t.earnedTrophies.bronze,
      silver: acc.silver + t.earnedTrophies.silver,
      gold: acc.gold + t.earnedTrophies.gold,
      platinum: acc.platinum + t.earnedTrophies.platinum,
    }),
    { bronze: 0, silver: 0, gold: 0, platinum: 0 },
  )
}

export function selectRecentPlatinumTitles(
  titles: TrophyTitle[],
  limit = PLATINUM_HIGHLIGHT_LIMIT,
): TrophyTitle[] {
  return [...titles]
    .filter((t) => t.progress === 100)
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedDateTime).getTime() -
        new Date(a.lastUpdatedDateTime).getTime(),
    )
    .slice(0, limit)
}

export function selectInProgressTitles(
  titles: TrophyTitle[],
  limit = RECENT_LIMIT,
): TrophyTitle[] {
  return [...titles]
    .filter((t) => t.progress > 0 && t.progress < 100)
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedDateTime).getTime() -
        new Date(a.lastUpdatedDateTime).getTime(),
    )
    .slice(0, limit)
}

export const STAT_KEYS = [
  {
    label: 'Games Played',
    icon: '🎮',
    getValue: ({ totalItemCount }: ProfileStatsProps) =>
      formatCount(totalItemCount),
  },
  {
    label: 'Platinums',
    icon: '🏆',
    getValue: ({ earnedTrophies }: ProfileStatsProps) =>
      formatCount(earnedTrophies.platinum),
  },
  {
    label: 'Completed',
    icon: '✅',
    getValue: ({ titles }: ProfileStatsProps) =>
      formatCount(titles.filter((t) => t.progress === 100).length),
  },
  {
    label: 'Avg Completion',
    icon: '📊',
    getValue: ({ titles }: ProfileStatsProps) => {
      if (titles.length === 0) return '0%'
      const avg = titles.reduce((sum, t) => sum + t.progress, 0) / titles.length
      return `${Math.round(avg)}%`
    },
  },
] as const

export const PLATFORM_CONFIG: Record<
  PSNPlatform,
  { label: string; color: string }
> = {
  PS5: { label: 'PS5', color: '#00439c' },
  PS4: { label: 'PS4', color: '#003791' },
  PS3: { label: 'PS3', color: '#1a5c9e' },
  PSVITA: { label: 'Vita', color: '#2d7bb5' },
  PSPC: { label: 'PC', color: '#4a9eca' },
}
