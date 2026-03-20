import type { AuthTokensResponse, TrophyTitle } from 'psn-api'
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getUserTitles,
} from 'psn-api'

export interface RecentTrophiesResult {
  titles: TrophyTitle[]
  totalItemCount: number
}

export async function getRecentTrophies(): Promise<RecentTrophiesResult> {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) {
    throw new Error('PSN_NPSSO environment variable is not defined.')
  }

  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const authTokens: AuthTokensResponse =
    await exchangeAccessCodeForAuthTokens(accessCode)

  const authorization = { accessToken: authTokens.accessToken }

  const { trophyTitles, totalItemCount } = await getUserTitles(
    authorization,
    'me',
    { limit: 10 },
  )

  return {
    titles: trophyTitles ?? [],
    totalItemCount: totalItemCount ?? 0,
  }
}
