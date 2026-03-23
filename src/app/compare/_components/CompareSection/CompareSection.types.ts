import type { ComparedGame, ComparedUser } from '@types'

export interface PlayerCardProps {
  user: ComparedUser
  align: 'left' | 'right'
}

export interface CompareHeaderProps {
  me: ComparedUser
  them: ComparedUser
}

export interface CompareSectionProps {
  onlineId: string
}

export interface StatCellProps {
  label: string
  myValue: number | string
  theirValue: number | string
}

export interface CompareStatsProps {
  me: ComparedUser
  them: ComparedUser
  commonGames: ComparedGame[]
}
