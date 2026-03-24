import type { PSNUserSearchResult, UserOverview } from '@services/psn/psn.types'
import type { CompareResult, GameTrophyDetails } from '@types'

export const DEMO_SNAPSHOT_VERSION = 1 as const

export interface DemoSnapshot {
  version: typeof DEMO_SNAPSHOT_VERSION
  generatedAt: string
  compareDemoOnlineId: string | null
  overview: UserOverview
  gameDetailsByNpCommunicationId: Record<string, GameTrophyDetails>
  searchByOnlineIdNormalized: Record<string, PSNUserSearchResult>
  compareByAccountId: Record<string, CompareResult>
}
