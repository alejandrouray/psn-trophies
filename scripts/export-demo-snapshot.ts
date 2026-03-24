import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { config } from 'dotenv'

config({ path: join(process.cwd(), '.env.local') })
config({ path: join(process.cwd(), '.env') })

// Loaded after env so PSN_NPSSO is available
import { normalizeCompareOnlineId } from '../src/lib/demo/demo-env'
import type { DemoSnapshot } from '../src/lib/demo/snapshot.types'
import { DEMO_SNAPSHOT_VERSION } from '../src/lib/demo/snapshot.types'
import {
  loadCompareUsersForOverview,
  loadSearchPSNUser,
} from '../src/services/psn/compare.fetch'
import { loadUserOverview } from '../src/services/psn/overview.fetch'
import { loadGameTrophyDetails } from '../src/services/psn/trophies.fetch'

const BATCH_SIZE = 4

async function main() {
  if (!process.env.PSN_NPSSO?.trim()) {
    throw new Error('PSN_NPSSO is missing. Add it to .env.local before export.')
  }

  const compareDemoOnlineId = process.env.COMPARE_DEMO_ONLINE_ID?.trim() ?? ''

  console.info('Fetching overview…')
  const overview = await loadUserOverview()

  const gameDetailsByNpCommunicationId: DemoSnapshot['gameDetailsByNpCommunicationId'] =
    {}
  const titles = overview.titles

  console.info(`Fetching trophy details for ${titles.length} titles…`)

  for (let i = 0; i < titles.length; i += BATCH_SIZE) {
    const chunk = titles.slice(i, i + BATCH_SIZE)
    const results = await Promise.all(
      chunk.map((t) =>
        loadGameTrophyDetails(t.npCommunicationId, t.npServiceName),
      ),
    )

    chunk.forEach((t, j) => {
      gameDetailsByNpCommunicationId[t.npCommunicationId] = results[j]
    })

    console.info(
      `  … ${Math.min(i + BATCH_SIZE, titles.length)} / ${titles.length}`,
    )
  }

  const searchByOnlineIdNormalized: DemoSnapshot['searchByOnlineIdNormalized'] =
    {}
  const compareByAccountId: DemoSnapshot['compareByAccountId'] = {}

  if (compareDemoOnlineId) {
    console.info(`Fetching compare demo for "${compareDemoOnlineId}"…`)
    const search = await loadSearchPSNUser(compareDemoOnlineId)

    if (!search) {
      throw new Error(
        `COMPARE_DEMO_ONLINE_ID not found on PSN: "${compareDemoOnlineId}"`,
      )
    }

    searchByOnlineIdNormalized[normalizeCompareOnlineId(compareDemoOnlineId)] =
      search
    compareByAccountId[search.accountId] = await loadCompareUsersForOverview(
      search.accountId,
      overview,
    )
  }

  const snapshot: DemoSnapshot = {
    version: DEMO_SNAPSHOT_VERSION,
    generatedAt: new Date().toISOString(),
    compareDemoOnlineId: compareDemoOnlineId || null,
    overview,
    gameDetailsByNpCommunicationId,
    searchByOnlineIdNormalized,
    compareByAccountId,
  }

  const outPath = join(process.cwd(), 'demo', 'snapshot.json')
  writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf-8')

  console.info(`✓ Wrote ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
