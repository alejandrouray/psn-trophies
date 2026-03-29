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

export interface ProfileInProgressProps {
  titles: TrophyTitle[]
}

export interface ProfilePlatformBreakdownProps {
  titles: TrophyTitle[]
}

export interface ProfileLibraryTrophyMixProps {
  titles: TrophyTitle[]
}

export interface ProfileRecentPlatinumsProps {
  titles: TrophyTitle[]
}
