import type { AvatarSource, TierGrade } from '@types'

// --- Tier constants ---

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

export const tierCssVar = (grade: TierGrade) => `var(--color-trophy-${grade})`

export const tierMix = (grade: TierGrade, opacity: number) =>
  `color-mix(in srgb, var(--color-trophy-${grade}) ${opacity}%, transparent)`

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

// --- Avatar ---

export function resolveAvatarUrl(profile: AvatarSource): string | undefined {
  const pictures = profile.personalDetail?.profilePictures
  const avatars = profile.avatars

  return (
    pictures?.find((p) => p.size === 'xl')?.url ??
    pictures?.find((p) => p.size === 'l')?.url ??
    avatars.find((a) => a.size === 'xl')?.url ??
    avatars.find((a) => a.size === 'l')?.url ??
    avatars[avatars.length - 1]?.url
  )
}
