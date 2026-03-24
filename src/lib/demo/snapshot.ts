import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { PSNUserSearchResult, UserOverview } from '@services/psn/psn.types'
import type { CompareResult, GameTrophyDetails } from '@types'
import { normalizeCompareOnlineId } from './demo-env'
import { DEMO_SNAPSHOT_VERSION, type DemoSnapshot } from './snapshot.types'

let cachedSnapshot: DemoSnapshot | null = null

function parseSnapshot(raw: string): DemoSnapshot {
  const parsed = JSON.parse(raw) as DemoSnapshot

  if (parsed.version !== DEMO_SNAPSHOT_VERSION) {
    throw new Error(
      `Unsupported demo snapshot version: ${String(parsed.version)}`,
    )
  }

  return parsed
}

export function getDemoSnapshot(): DemoSnapshot {
  if (cachedSnapshot) return cachedSnapshot

  const path = join(process.cwd(), 'demo', 'snapshot.json')
  cachedSnapshot = parseSnapshot(readFileSync(path, 'utf-8'))

  return cachedSnapshot
}

export function readDemoOverview(): UserOverview {
  return getDemoSnapshot().overview
}

export function readDemoGameDetails(
  npCommunicationId: string,
): GameTrophyDetails {
  const hit =
    getDemoSnapshot().gameDetailsByNpCommunicationId[npCommunicationId]

  if (!hit) throw new Error(`Demo snapshot missing game: ${npCommunicationId}`)

  return hit
}

export function readDemoSearchResult(
  onlineId: string,
): PSNUserSearchResult | null {
  const key = normalizeCompareOnlineId(onlineId)

  return getDemoSnapshot().searchByOnlineIdNormalized[key] ?? null
}

export function readDemoCompareResult(theirAccountId: string): CompareResult {
  const hit = getDemoSnapshot().compareByAccountId[theirAccountId]

  if (!hit)
    throw new Error(`Demo snapshot missing compare for: ${theirAccountId}`)

  return hit
}
