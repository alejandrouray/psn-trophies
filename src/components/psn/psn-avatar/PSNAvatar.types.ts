import type { TierGrade } from '@types'

export interface PSNAvatarProps {
  avatarUrl: string | undefined
  onlineId: string
  grade: TierGrade
  /** sm = 16/20 (dashboard), lg = 28/36 (profile). Defaults to 'sm'. */
  size?: 'sm' | 'lg'
}
