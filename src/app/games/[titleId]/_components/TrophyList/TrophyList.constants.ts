import type { TrophyDetail } from '@types'

export const TROPHY_FILTERS = {
  ALL: 'all',
  EARNED: 'earned',
  NOT_EARNED: 'not-earned',
} as const

export const TROPHY_FILTER_OPTIONS = [
  { label: 'All', value: TROPHY_FILTERS.ALL },
  { label: 'Earned', value: TROPHY_FILTERS.EARNED },
  { label: 'Not Earned', value: TROPHY_FILTERS.NOT_EARNED },
] as const

export const SKELETON_KEYS = [
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  's8',
] as const

export function applyFilter(
  trophies: TrophyDetail[],
  filter: (typeof TROPHY_FILTERS)[keyof typeof TROPHY_FILTERS],
  groupId: string | null,
) {
  let result = trophies

  if (groupId !== null) result = result.filter((t) => t.groupId === groupId)
  if (filter === TROPHY_FILTERS.EARNED) result = result.filter((t) => t.earned)
  if (filter === TROPHY_FILTERS.NOT_EARNED) result = result.filter((t) => !t.earned)

  return result
}
