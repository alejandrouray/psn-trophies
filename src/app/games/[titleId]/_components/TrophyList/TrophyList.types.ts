import type { TrophyDetail, TrophyGroupInfo } from '@types'
import type { TrophyTitle } from 'psn-api'
import type { TROPHY_FILTERS } from './TrophyList.constants'

export type TrophyFilter = (typeof TROPHY_FILTERS)[keyof typeof TROPHY_FILTERS]

export interface TrophyListProps {
  titleId: string
}

export interface TrophyListClientProps {
  game: TrophyTitle
  trophies: TrophyDetail[]
  groups: TrophyGroupInfo[]
  totalCount: number
  earnedCount: number
}
