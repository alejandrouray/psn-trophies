import { isDemoMode } from '@lib/demo'
import { readDemoGameDetails } from '@lib/demo/snapshot'
import type { GameTrophyDetails } from '@types'
import { cacheLife, cacheTag } from 'next/cache'
import { loadGameTrophyDetails } from './trophies.fetch'

export async function getGameTrophyDetails(
  npCommunicationId: string,
  npServiceName: 'trophy' | 'trophy2',
): Promise<GameTrophyDetails> {
  if (isDemoMode()) return readDemoGameDetails(npCommunicationId)

  return getGameTrophyDetailsCached(npCommunicationId, npServiceName)
}

async function getGameTrophyDetailsCached(
  npCommunicationId: string,
  npServiceName: 'trophy' | 'trophy2',
): Promise<GameTrophyDetails> {
  'use cache'
  cacheLife('psn')
  cacheTag(`psn-trophies-${npCommunicationId}`)

  return loadGameTrophyDetails(npCommunicationId, npServiceName)
}
