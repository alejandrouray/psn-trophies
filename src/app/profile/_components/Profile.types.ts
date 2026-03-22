import type { PSNProfile } from '@types'
import type { TrophyTitle, UserTrophyProfileSummaryResponse } from 'psn-api'

export interface ProfileHeroProps {
  profile: PSNProfile | null
  trophySummary: UserTrophyProfileSummaryResponse
}

export interface ProfileStatsProps {
  totalItemCount: number
  titles: TrophyTitle[]
  earnedTrophies: UserTrophyProfileSummaryResponse['earnedTrophies']
}

export interface ProfileRecentActivityProps {
  titles: TrophyTitle[]
}
