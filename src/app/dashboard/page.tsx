import { ErrorState } from '@components'
import { Suspense } from 'react'
import {
  DashboardHeaderSection,
  DashboardHeaderSkeleton,
} from './_components/DashboardHeader'
import { GamesGrid, GamesGridSkeleton } from './_components/GamesGrid'

export default function DashboardPage() {
  // Check config before streaming starts so we can return a meaningful UI
  // without the error reaching error.tsx (which can't distinguish error types in production)
  if (!process.env.PSN_NPSSO) {
    return (
      <ErrorState
        title="Configuration Incomplete"
        icon="🔑"
        description={
          <>
            Missing the variable{' '}
            <code className="bg-muted px-2 py-1 rounded text-accent">
              PSN_NPSSO
            </code>{' '}
            in your .env.local file.
          </>
        }
      />
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(0,87,184,0.4)]">
            Trophy <span className="text-primary">Hub</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-[0.3em]">
            Synced with PlayStation Network
          </p>
        </header>

        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeaderSection />
        </Suspense>

        <Suspense fallback={<GamesGridSkeleton />}>
          <GamesGrid />
        </Suspense>
      </div>
    </main>
  )
}
