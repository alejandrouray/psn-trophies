import type { TierGrade } from '@types'

export interface PSNLevelProps {
  trophyLevel: string
  progress: number
  tier: number
  grade: TierGrade
  /**
   * compact — solo nivel + badge + barra (DashboardHeader)
   * full    — añade "Tier X / 10" debajo del badge (ProfileHero)
   */
  variant?: 'compact' | 'full'
}
