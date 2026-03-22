import { isFulfilled } from '@lib'
import type { GameTrophyDetails, TrophyDetail, TrophyGroupInfo } from '@types'
import { cacheLife, cacheTag } from 'next/cache'
import {
  getTitleTrophies,
  getTitleTrophyGroups,
  getUserTrophiesEarnedForTitle,
} from 'psn-api'
import { authorize } from './psn.auth'
import { PSN_ME } from './psn.constants'

export async function getGameTrophyDetails(
  npCommunicationId: string,
  npServiceName: 'trophy' | 'trophy2',
): Promise<GameTrophyDetails> {
  'use cache'
  cacheLife('psn')
  cacheTag(`psn-trophies-${npCommunicationId}`)

  const authorization = await authorize()

  const [titleResult, earnedResult, groupsResult] = await Promise.allSettled([
    getTitleTrophies(authorization, npCommunicationId, 'all', { npServiceName }),
    getUserTrophiesEarnedForTitle(
      authorization,
      PSN_ME,
      npCommunicationId,
      'all',
      { npServiceName },
    ),
    getTitleTrophyGroups(authorization, npCommunicationId, { npServiceName }),
  ])

  const titleTrophies = isFulfilled(titleResult) ? titleResult.value.trophies : []
  const earnedTrophies = isFulfilled(earnedResult) ? earnedResult.value.trophies : []

  const groups: TrophyGroupInfo[] = isFulfilled(groupsResult)
    ? groupsResult.value.trophyGroups.map((g) => ({
        id: g.trophyGroupId,
        name: g.trophyGroupName,
        iconUrl: g.trophyGroupIconUrl,
        definedTrophies: g.definedTrophies,
      }))
    : []

  const earnedMap = new Map(earnedTrophies.map((t) => [t.trophyId, t]))

  const trophies: TrophyDetail[] = titleTrophies.map((t) => {
    const earned = earnedMap.get(t.trophyId)

    return {
      id: t.trophyId,
      name: t.trophyName ?? 'Hidden Trophy',
      description: t.trophyDetail ?? '',
      type: t.trophyType,
      iconUrl: t.trophyIconUrl ?? '',
      hidden: t.trophyHidden,
      earned: earned?.earned ?? false,
      earnedDateTime: earned?.earnedDateTime,
      earnedRate: earned?.trophyEarnedRate,
      groupId: t.trophyGroupId ?? 'default',
    }
  })

  const earnedCount = trophies.filter((t) => t.earned).length

  return { trophies, groups, totalCount: trophies.length, earnedCount }
}
