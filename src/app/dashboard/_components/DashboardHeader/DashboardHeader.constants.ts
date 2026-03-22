import { TIER_GRADES } from '@lib'
import type { TierGrade } from '@types'

export { TROPHY_TYPES } from '@lib'

// --- Utility functions ---

export const TIER_GRADE = (tier: number): TierGrade => {
  if (tier <= 3) return TIER_GRADES.BRONZE
  if (tier <= 6) return TIER_GRADES.SILVER
  if (tier <= 9) return TIER_GRADES.GOLD
  return TIER_GRADES.PLATINUM
}
