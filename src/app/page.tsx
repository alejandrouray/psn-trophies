import { Badge, Card, ErrorState } from '@components'
import { getRecentTrophies, PSNConfigurationError } from '@services/psn'
import Image from 'next/image'

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {titles.map((game, index) => (
              <Card
                key={game.npCommunicationId}
                className="relative flex flex-col h-full overflow-hidden group border-none bg-[#030303] rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 p-0"
              >
                <div
                  className="relative aspect-4/5 w-full shrink-0 overflow-hidden"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, black 60%, transparent 100%)',
                  }}
                >
                  <Image
                    src={game.trophyTitleIconUrl}
                    alt={game.trophyTitleName}
                    priority={index < 6}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/90 to-transparent z-10" />
                </div>

                <div className="flex flex-col flex-1 p-8 pt-0 -mt-16 z-10 relative">
                  <div className="space-y-1 mb-6">
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                      {game.trophyTitleName}
                    </h3>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest leading-none">
                      Last updated:{' '}
                      {new Date(game.lastUpdatedDateTime).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-auto space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-zinc-900/60backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                        <span className="text-xs">🏆</span>
                        <span className="text-[10px] text-white font-bold tracking-wider">
                          {game.progress}%
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-zinc-800 text-zinc-500 text-[9px] uppercase tracking-widest bg-black/20"
                      >
                        {game.trophyTitlePlatform}
                      </Badge>
                    </div>

                    <div className="w-full h-1.5 bg-zinc-900/50 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] transition-all duration-1000"
                        style={{ width: `${game.progress}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.25em] shadow-lg"
                    >
                      View Trophies
                    </button>
                  </div>
                </div>
              </Card>
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
