import type { PSNPlatform } from '@types'
import type { FilterStatus, TitleFilters } from './GamesGrid.types'

// --- Base constants ---

export const PLATFORMS: { value: PSNPlatform; label: string }[] = [
  { value: 'PS5', label: 'PS5' },
  { value: 'PS4', label: 'PS4' },
  { value: 'PS3', label: 'PS3' },
  { value: 'PSVITA', label: 'Vita' },
  { value: 'PSPC', label: 'PC' },
]

export const STATUSES: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'complete', label: 'Complete' },
]

// --- Derived data ---

export const DEFAULT_FILTERS: TitleFilters = {
  search: '',
  platform: null,
  status: 'all',
}
