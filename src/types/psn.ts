export type PSNPlatform =
  | 'PS5'
  | 'PS4'
  | 'PS3'
  | 'PS Vita'
  | 'PSPC'
  | (string & {})

export interface PSNGame {
  npCommunicationId: string
  trophyTitleName: string
  trophyTitleIconUrl: string
  trophyTitlePlatform: PSNPlatform
  progress: number
  lastUpdatedDateTime: string
}
