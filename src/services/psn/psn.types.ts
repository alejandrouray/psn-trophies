import type { TrophyTitle } from 'psn-api'

export interface RecentTrophiesResponse {
  titles: TrophyTitle[]
  totalItemCount: number
}
