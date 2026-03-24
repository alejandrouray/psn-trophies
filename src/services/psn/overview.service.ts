import { isDemoMode } from '@lib/demo'
import { readDemoOverview } from '@lib/demo/snapshot'
import { cacheLife, cacheTag } from 'next/cache'
import { loadUserOverview } from './overview.fetch'
import type { UserOverview } from './psn.types'

export async function getUserOverview(): Promise<UserOverview> {
  if (isDemoMode()) return readDemoOverview()

  return getUserOverviewCached()
}

async function getUserOverviewCached(): Promise<UserOverview> {
  'use cache'
  cacheLife('psn')
  cacheTag('psn-overview')

  return loadUserOverview()
}
