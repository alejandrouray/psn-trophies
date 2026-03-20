import {
  PSNConfigurationError,
  type RecentTrophiesResponse,
} from '@services/psn'
import type { AuthTokensResponse } from 'psn-api'
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getUserTitles,
} from 'psn-api'

export async function getRecentTrophies(): Promise<RecentTrophiesResponse> {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) {
    throw new PSNConfigurationError()
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
