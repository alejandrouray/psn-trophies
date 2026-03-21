import { ErrorState, GameCard } from '@components'
import { getDashboardData, PSNConfigurationError } from '@services/psn'
import { DashboardHeader } from './_components/DashboardHeader'

export default async function DashboardPage() {
  try {
    const { profile, trophySummary, titles } = await getDashboardData()

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

          <DashboardHeader profile={profile} trophySummary={trophySummary} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {titles.map((game, index) => (
              <GameCard key={game.npCommunicationId} game={game} index={index} />
            ))}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    if (error instanceof PSNConfigurationError) {
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

    return <ErrorState icon="📡" title="Connection Error" />
  }
}
