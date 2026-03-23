import type { TierGrade } from '@types'

export interface PSNLevelProps {
  trophyLevel: string
  progress: number
  tier: number
  grade: TierGrade
  variant?: 'compact' | 'full'
}
