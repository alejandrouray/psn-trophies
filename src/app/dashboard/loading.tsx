import { DashboardHeaderSkeleton } from './_components/DashboardHeader'
import { GamesGridSkeleton } from './_components/GamesGrid'

export default function Loading() {
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

        <DashboardHeaderSkeleton />
        <GamesGridSkeleton />
      </div>
    </main>
  )
}
