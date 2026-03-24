import { isDemoMode } from '@lib/demo'
import { readDemoCompareResult, readDemoSearchResult } from '@lib/demo/snapshot'
import type { CompareResult } from '@types'
import { cacheLife, cacheTag } from 'next/cache'
import { loadCompareUsersForOverview, loadSearchPSNUser } from './compare.fetch'
import { getUserOverview } from './overview.service'
import type { PSNUserSearchResult } from './psn.types'

export async function searchPSNUser(
  onlineId: string,
): Promise<PSNUserSearchResult | null> {
  if (isDemoMode()) return readDemoSearchResult(onlineId)

  return loadSearchPSNUser(onlineId)
}

export async function compareUsers(
  theirAccountId: string,
): Promise<CompareResult> {
  if (isDemoMode()) return readDemoCompareResult(theirAccountId)

  return compareUsersCached(theirAccountId)
}

async function compareUsersCached(
  theirAccountId: string,
): Promise<CompareResult> {
  'use cache'
  cacheLife('psn')
  cacheTag(`psn-compare-${theirAccountId}`)

  const myOverview = await getUserOverview()

  return loadCompareUsersForOverview(theirAccountId, myOverview)
}
