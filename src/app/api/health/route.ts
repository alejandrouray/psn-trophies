import { isDemoMode } from '@lib/demo'
import { PSNConfigurationError } from '@services/psn'
import { authorize } from '@services/psn/psn.auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  if (isDemoMode()) {
    return NextResponse.json(
      {
        status: 'demo',
        message: 'Running in static demo mode — no live PSN connection.',
      },
      { status: 200 },
    )
  }

  if (!process.env.PSN_NPSSO?.trim()) {
    return NextResponse.json(
      { status: 'error', reason: 'missing_npsso' },
      { status: 503 },
    )
  }

  try {
    await authorize()

    return NextResponse.json(
      { status: 'ok', message: 'PSN authentication is healthy.' },
      { status: 200 },
    )
  } catch (err) {
    const reason =
      err instanceof PSNConfigurationError ? 'missing_npsso' : 'psn_auth_failed'

    return NextResponse.json({ status: 'error', reason }, { status: 503 })
  }
}
