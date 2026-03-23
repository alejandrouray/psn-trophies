import type { PSNProfile } from '@types'
import type { TrophyTitle, UserTrophyProfileSummaryResponse } from 'psn-api'

export interface UserOverview {
  profile: PSNProfile | null
  trophySummary: UserTrophyProfileSummaryResponse
  titles: TrophyTitle[]
  totalItemCount: number
}

export interface PSNUserSearchResult {
  accountId: string
  onlineId: string
  avatarUrl: string
  isPsPlus: boolean
}
