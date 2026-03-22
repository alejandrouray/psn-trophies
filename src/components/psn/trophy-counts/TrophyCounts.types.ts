import type { TrophyCounts as TrophyCountsType } from 'psn-api'

export interface TrophyCountsProps {
  earnedTrophies: TrophyCountsType
  /** sm = dashboard (iconos xl, contadores 2xl), lg = profile (2xl / 3xl). Defaults to 'sm'. */
  size?: 'sm' | 'lg'
}
