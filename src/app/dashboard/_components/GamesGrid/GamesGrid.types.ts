import type { TrophyTitle } from 'psn-api'

export type FilterStatus = 'all' | 'in-progress' | 'complete'

export type FilterPlatform = 'PS5' | 'PS4' | 'PS3' | 'PSVITA' | 'PSPC'

export interface TitleFilters {
  search: string
  platform: FilterPlatform | null
  status: FilterStatus
}

export interface GamesGridClientProps {
  titles: TrophyTitle[]
}
