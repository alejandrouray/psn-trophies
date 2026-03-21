import { ErrorState, GameCard } from '@components'
import { getRecentTrophies, PSNConfigurationError } from '@services/psn'

export default async function DashboardPage() {
  try {
    const { titles } = await getRecentTrophies()

    return (
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl font-extrabold tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Trophy <span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-[0.3em]">
              Synced with PlayStation Network
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {titles.map((game, index) => (
              <GameCard
                key={game.npCommunicationId}
                game={game}
                index={index}
              />
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
              <code className="bg-zinc-800 px-2 py-1 rounded text-blue-400">
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
