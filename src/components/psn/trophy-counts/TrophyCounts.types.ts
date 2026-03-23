import type { TrophyCounts as TrophyCountsType } from 'psn-api'

export interface TrophyCountsProps {
  earnedTrophies: TrophyCountsType
  size?: 'sm' | 'lg'
}
