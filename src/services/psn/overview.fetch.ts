import { isFulfilled, isRejected, logger } from '@lib'
import type { PSNProfile } from '@types'
import {
  getProfileFromAccountId,
  getUserTitles,
  getUserTrophyProfileSummary,
} from 'psn-api'
import { authorize } from './psn.auth'
import { PSN_ME, TITLES_LIMIT } from './psn.constants'
import type { UserOverview } from './psn.types'

export async function loadUserOverview(): Promise<UserOverview> {
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
