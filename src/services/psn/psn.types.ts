import type {
  ProfileFromAccountIdResponse,
  TrophyTitle,
  UserTrophyProfileSummaryResponse,
} from 'psn-api'

export interface RecentTrophiesResponse {
  titles: TrophyTitle[]
  totalItemCount: number
}

export interface DashboardData {
  profile: ProfileFromAccountIdResponse | null
  trophySummary: UserTrophyProfileSummaryResponse
  titles: TrophyTitle[]
  totalItemCount: number
}
