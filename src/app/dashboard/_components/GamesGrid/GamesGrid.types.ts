import type { TrophyTitle } from 'psn-api'
import type { PSNPlatform } from '@types'

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
