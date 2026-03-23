import { ErrorState } from '@components'
import { Suspense } from 'react'
import { CompareSearch } from './_components/CompareSearch'
import { CompareSection, CompareSkeleton } from './_components/CompareSection'

export const metadata = {
  title: 'Compare — Trophy Hub',
  description: 'Compare your PlayStation trophy progress with another player.',
}

interface ComparePageProps {
  searchParams: Promise<{ user?: string }>
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  if (!process.env.PSN_NPSSO) {
    return (
      <ErrorState
        title="Configuration Incomplete"
        icon="🔑"
        description={
          <>
            Missing the variable{' '}
            <code className="bg-muted px-2 py-1 rounded text-accent">PSN_NPSSO</code>{' '}
            in your .env.local file.
          </>
        }
      />
    )
  }

  const { user } = await searchParams

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(0,87,184,0.4)]">
            Compare
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-[0.3em]">
            Trophy progress head-to-head
          </p>
        </header>

        <CompareSearch defaultValue={user ?? ''} />

        {user && (
          <Suspense fallback={<CompareSkeleton />}>
            <CompareSection onlineId={user} />
          </Suspense>
        )}
      </div>
    </main>
  )
}
