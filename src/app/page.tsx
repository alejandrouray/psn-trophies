import { Badge } from '@components/ui/badge'
import { Card, CardContent } from '@components/ui/card'
import { Progress } from '@components/ui/progress'
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
              Sincronizado con PlayStation Network
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {titles.map((game) => (
              <Card
                key={game.npCommunicationId}
                className="bg-zinc-900/40 border-white/5 backdrop-blur-md overflow-hidden group hover:border-blue-500/50 transition-all duration-500"
              >
                <div className="relative aspect-video">
                  <Image
                    src={game.trophyTitleIconUrl}
                    alt={game.trophyTitleName}
                    fill
                    className="object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-blue-700/80 text-[10px] border-none font-bold">
                    {game.trophyTitlePlatform}
                  </Badge>
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold truncate mb-4 text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {game.trophyTitleName}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-zinc-500">
                      <span>Progreso Total</span>
                      <span className="text-blue-500">{game.progress}%</span>
                    </div>
                    <Progress
                      value={game.progress}
                      className="h-1 bg-zinc-800"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    if (error instanceof PSNConfigurationError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="text-center space-y-4 border border-red-900/50 p-8 rounded-lg bg-red-950/10">
            <h2 className="text-2xl font-bold text-red-500">
              Error de Configuración
            </h2>
            <p className="text-zinc-400 max-w-md">
              Falta la variable{' '}
              <code className="bg-zinc-800 px-2 py-1 rounded text-white">
                PSN_NPSSO
              </code>{' '}
              en tu archivo .env.local.
            </p>
          </div>
        </div>
      )
    }

    throw error
  }
}
