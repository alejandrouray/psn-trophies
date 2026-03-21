import type { TierGrade } from '@types'

// --- Base constants ---

export const TIER_GRADES = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
} as const satisfies Record<string, TierGrade>

export const TIER_LABEL: Record<TierGrade, string> = {
  [TIER_GRADES.BRONZE]: 'Bronze',
  [TIER_GRADES.SILVER]: 'Silver',
  [TIER_GRADES.GOLD]: 'Gold',
  [TIER_GRADES.PLATINUM]: 'Platinum',
}

// --- Utility functions ---

export const TIER_GRADE = (tier: number): TierGrade => {
  if (tier <= 3) return TIER_GRADES.BRONZE
  if (tier <= 6) return TIER_GRADES.SILVER
  if (tier <= 9) return TIER_GRADES.GOLD
  return TIER_GRADES.PLATINUM
}

export const tierCssVar = (grade: TierGrade) => `var(--color-trophy-${grade})`

export const tierMix = (grade: TierGrade, opacity: number) =>
  `color-mix(in srgb, var(--color-trophy-${grade}) ${opacity}%, transparent)`

// --- Derived data ---

export const TROPHY_TYPES = [
  {
    key: TIER_GRADES.PLATINUM,
    label: TIER_LABEL[TIER_GRADES.PLATINUM],
    color: tierCssVar(TIER_GRADES.PLATINUM),
    icon: '🏆',
  },
  {
    key: TIER_GRADES.GOLD,
    label: TIER_LABEL[TIER_GRADES.GOLD],
    color: tierCssVar(TIER_GRADES.GOLD),
    icon: '🥇',
  },
  {
    key: TIER_GRADES.SILVER,
    label: TIER_LABEL[TIER_GRADES.SILVER],
    color: tierCssVar(TIER_GRADES.SILVER),
    icon: '🥈',
  },
  {
    key: TIER_GRADES.BRONZE,
    label: TIER_LABEL[TIER_GRADES.BRONZE],
    color: tierCssVar(TIER_GRADES.BRONZE),
    icon: '🥉',
  },
] as const
