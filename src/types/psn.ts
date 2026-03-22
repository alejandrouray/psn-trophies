import type { ProfileFromAccountIdResponse } from 'psn-api'

export type PSNPlatform =
  | 'PS5'
  | 'PS4'
  | 'PS3'
  | 'PSVITA'
  | 'PSPC'
  | (string & {})

export type TierGrade = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface PSNImage {
  size: string
  url: string
}

export interface PSNGame {
  npCommunicationId: string
  trophyTitleName: string
  trophyTitleIconUrl: string
  trophyTitlePlatform: PSNPlatform
  progress: number
  lastUpdatedDateTime: string
}

export interface AvatarSource {
  personalDetail?: { profilePictures?: PSNImage[] }
  avatars: PSNImage[]
}

/**
 * Extends psn-api's ProfileFromAccountIdResponse with undocumented fields
 * that the PSN API actually returns at runtime.
 */
interface PSNProfileExtended {
  personalDetail?: {
    firstName: string
    lastName: string
    profilePictures: PSNImage[]
  }
}

export type PSNProfile = ProfileFromAccountIdResponse & PSNProfileExtended
