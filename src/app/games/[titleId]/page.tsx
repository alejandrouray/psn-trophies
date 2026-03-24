import { ErrorState } from '@components'
import { hasPsnOrDemo } from '@lib/demo'
import { getUserOverview } from '@services/psn'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TrophyList, TrophyListSkeleton } from './_components/TrophyList'

export async function generateMetadata({
  params,
}: PageProps<'/games/[titleId]'>): Promise<Metadata> {
  const { titleId } = await params
  const { titles } = await getUserOverview()
  const game = titles.find((t) => t.npCommunicationId === titleId)

  return {
    title: game?.trophyTitleName ?? 'Game Trophies',
    description: `Trophy list for ${game?.trophyTitleName ?? 'this game'} on PlayStation Network.`,
  }
}

export default function GamePage({ params }: PageProps<'/games/[titleId]'>) {
  if (!hasPsnOrDemo()) {
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
      <div className="max-w-5xl mx-auto space-y-8">
        <Suspense fallback={<TrophyListSkeleton />}>
          {params.then(({ titleId }) => (
            <TrophyList titleId={titleId} />
          ))}
        </Suspense>
      </div>
    </main>
  )
}
