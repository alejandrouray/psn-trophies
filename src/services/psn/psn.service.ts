import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getProfileFromAccountId,
  getUserTitles,
  getUserTrophyProfileSummary,
} from 'psn-api'
import { PSNConfigurationError } from './psn.errors'
import type { DashboardData, RecentTrophiesResponse } from './psn.types'

async function authorize() {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) throw new PSNConfigurationError()

  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const { accessToken } = await exchangeAccessCodeForAuthTokens(accessCode)

  return { accessToken }
}

export async function getRecentTrophies(): Promise<RecentTrophiesResponse> {
  const authorization = await authorize()
  const { trophyTitles, totalItemCount } = await getUserTitles(
    authorization,
    'me',
    { limit: 15 },
  )
  return { titles: trophyTitles ?? [], totalItemCount: totalItemCount ?? 0 }
}

export async function getDashboardData(): Promise<DashboardData> {
  const authorization = await authorize()

  // Trophy summary first — contains accountId needed for profile fetch
  const trophySummary = await getUserTrophyProfileSummary(authorization, 'me')

  const [profileResult, titlesResult] = await Promise.allSettled([
    getProfileFromAccountId(authorization, trophySummary.accountId),
    getUserTitles(authorization, 'me', { limit: 15 }),
  ])

  const profile =
    profileResult.status === 'fulfilled' ? profileResult.value : null

  const { trophyTitles, totalItemCount } =
    titlesResult.status === 'fulfilled'
      ? titlesResult.value
      : { trophyTitles: [], totalItemCount: 0 }

  return {
    profile,
    trophySummary,
    titles: trophyTitles ?? [],
    totalItemCount: totalItemCount ?? 0,
  }
}
