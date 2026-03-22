import type { PSNPlatform } from '@types'
import type { TrophyTitle } from 'psn-api'

export type FilterStatus = 'all' | 'in-progress' | 'complete'

export interface TitleFilters {
  search: string
  platform: PSNPlatform | null
  status: FilterStatus
}

export interface GamesGridClientProps {
  titles: TrophyTitle[]
}

export interface GamesGridFiltersProps {
  filters: TitleFilters
  totalCount: number
  filteredCount: number
  onFiltersChange: (filters: TitleFilters) => void
}
