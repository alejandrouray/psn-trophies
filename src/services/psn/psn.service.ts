import { logger } from '@lib'
import type { PSNProfile } from '@types'
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getProfileFromAccountId,
  getUserTitles,
  getUserTrophyProfileSummary,
} from 'psn-api'
import { PSN_ME, TITLES_LIMIT } from './psn.constants'
import { PSNConfigurationError } from './psn.errors'
import type { UserOverview } from './psn.types'

function isFulfilled<T>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> {
  return result.status === 'fulfilled'
}

function isRejected<T>(
  result: PromiseSettledResult<T>,
): result is PromiseRejectedResult {
  return result.status === 'rejected'
}

async function authorize() {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) throw new PSNConfigurationError()

  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const { accessToken } = await exchangeAccessCodeForAuthTokens(accessCode)

  return { accessToken }
}

export async function getUserOverview(): Promise<UserOverview> {
  const authorization = await authorize()

  // Trophy summary first — contains accountId needed for profile fetch
  const trophySummary = await getUserTrophyProfileSummary(authorization, PSN_ME)

  const [profileResult, titlesResult] = await Promise.allSettled([
    getProfileFromAccountId(authorization, trophySummary.accountId),
    getUserTitles(authorization, PSN_ME, { limit: TITLES_LIMIT }),
  ])

  if (isRejected(profileResult)) {
    logger.warn(
      'getProfileFromAccountId failed — rendering without profile',
      profileResult.reason,
    )
  }

  const profile = isFulfilled(profileResult)
    ? (profileResult.value as PSNProfile)
    : null

  const { trophyTitles, totalItemCount } = isFulfilled(titlesResult)
    ? titlesResult.value
    : { trophyTitles: [], totalItemCount: 0 }

  return {
    profile,
    trophySummary,
    titles: trophyTitles ?? [],
    totalItemCount: totalItemCount ?? 0,
  }
}
