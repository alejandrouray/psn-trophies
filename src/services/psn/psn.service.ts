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

  const [profile, { trophyTitles, totalItemCount }] = await Promise.all([
    getProfileFromAccountId(authorization, trophySummary.accountId),
    getUserTitles(authorization, 'me', { limit: 15 }),
  ])

  return {
    profile,
    trophySummary,
    titles: trophyTitles ?? [],
    totalItemCount: totalItemCount ?? 0,
  }
}
