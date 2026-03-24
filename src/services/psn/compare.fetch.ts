import { isFulfilled, isRejected, logger } from '@lib'
import type {
  ComparedGame,
  ComparedUser,
  CompareResult,
  PSNProfile,
} from '@types'
import {
  getProfileFromAccountId,
  getUserTitles,
  getUserTrophyProfileSummary,
  makeUniversalSearch,
} from 'psn-api'
import { authorize } from './psn.auth'
import { TITLES_LIMIT } from './psn.constants'
import type { PSNUserSearchResult, UserOverview } from './psn.types'

export async function loadSearchPSNUser(
  onlineId: string,
): Promise<PSNUserSearchResult | null> {
  const authorization = await authorize()

  const { domainResponses } = await makeUniversalSearch(
    authorization,
    onlineId,
    'SocialAllAccounts',
  )

  const match = domainResponses[0]?.results?.[0]

  if (!match) return null

  const { socialMetadata } = match

  return {
    accountId: socialMetadata.accountId,
    onlineId: socialMetadata.onlineId,
    avatarUrl: socialMetadata.avatarUrl,
    isPsPlus: socialMetadata.isPsPlus,
  }
}

export async function loadCompareUsersForOverview(
  theirAccountId: string,
  myOverview: UserOverview,
): Promise<CompareResult> {
  const authorization = await authorize()

  const [theirSummaryResult, theirTitlesResult, theirProfileResult] =
    await Promise.allSettled([
      getUserTrophyProfileSummary(authorization, theirAccountId),
      getUserTitles(authorization, theirAccountId, { limit: TITLES_LIMIT }),
      getProfileFromAccountId(authorization, theirAccountId),
    ])

  if (isRejected(theirSummaryResult)) {
    throw new Error("Failed to fetch the other user's trophy summary")
  }

  if (isRejected(theirProfileResult)) {
    logger.warn(
      'getProfileFromAccountId failed for compared user — rendering without profile',
      theirProfileResult.reason,
    )
  }

  const theirProfile = isFulfilled(theirProfileResult)
    ? (theirProfileResult.value as PSNProfile)
    : null

  const theirTitles = isFulfilled(theirTitlesResult)
    ? (theirTitlesResult.value.trophyTitles ?? [])
    : []

  const me: ComparedUser = {
    profile: myOverview.profile,
    trophySummary: myOverview.trophySummary,
    titles: myOverview.titles,
  }

  const them: ComparedUser = {
    profile: theirProfile,
    trophySummary: theirSummaryResult.value,
    titles: theirTitles,
  }

  const theirTitlesMap = new Map(
    theirTitles.map((t) => [t.npCommunicationId, t]),
  )

  const commonGames: ComparedGame[] = myOverview.titles
    .flatMap((myTitle) => {
      const theirTitle = theirTitlesMap.get(myTitle.npCommunicationId)
      if (!theirTitle) return []

      return [
        {
          npCommunicationId: myTitle.npCommunicationId,
          name: myTitle.trophyTitleName,
          iconUrl: myTitle.trophyTitleIconUrl,
          platform: myTitle.trophyTitlePlatform,
          myProgress: myTitle.progress,
          theirProgress: theirTitle.progress,
        },
      ]
    })
    .sort(
      (a, b) =>
        Math.abs(b.myProgress - b.theirProgress) -
        Math.abs(a.myProgress - a.theirProgress),
    )

  return { me, them, commonGames }
}
