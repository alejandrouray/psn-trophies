import type { PSNProfile } from '@types'
import type { UserTrophyProfileSummaryResponse } from 'psn-api'

export interface DashboardHeaderProps {
  profile: PSNProfile | null
  trophySummary: UserTrophyProfileSummaryResponse
}
