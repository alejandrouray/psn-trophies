'use client'

import { Button } from '@components'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function DashboardError({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error('[Dashboard] Runtime error', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <span className="text-6xl" aria-hidden="true">
          📡
        </span>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Connection Error
          </h2>
          <p className="text-muted-foreground text-sm">
            Could not reach the PlayStation Network. This may be temporary.
          </p>
          {error.digest && (
            <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              ref: {error.digest}
            </p>
          )}
        </div>

        <Button variant="psn" onClick={unstable_retry}>
          Try again
        </Button>
      </div>
    </main>
  )
}
