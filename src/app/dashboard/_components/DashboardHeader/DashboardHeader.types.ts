import type {
  ProfileFromAccountIdResponse,
  UserTrophyProfileSummaryResponse,
} from 'psn-api'

export interface DashboardHeaderProps {
  profile: ProfileFromAccountIdResponse
  trophySummary: UserTrophyProfileSummaryResponse
}
