import { formatCount } from '@lib'
import type { ProfileStatsProps } from './Profile.types'

export const RECENT_LIMIT = 6

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
