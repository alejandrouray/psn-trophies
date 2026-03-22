import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
} from 'psn-api'
import { cache } from 'react'
import { PSNConfigurationError } from './psn.errors'

/**
 * Request-level memoized auth token exchange.
 * React.cache deduplicates concurrent calls within a single render pass
 * so all services share one token without redundant network round-trips.
 */
export const authorize = cache(async () => {
  const npsso = process.env.PSN_NPSSO

  if (!npsso) throw new PSNConfigurationError()

  const accessCode = await exchangeNpssoForAccessCode(npsso)
  const { accessToken } = await exchangeAccessCodeForAuthTokens(accessCode)

  return { accessToken }
})
