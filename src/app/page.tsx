import { Button } from '@components'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(0,87,184,0.12),transparent)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[5%] left-[8%] text-[18vw] font-bold text-primary/4 rotate-12">△</span>
        <span className="absolute bottom-[8%] right-[6%] text-[14vw] font-bold text-primary/4 -rotate-6">○</span>
        <span className="absolute top-[18%] right-[10%] text-[10vw] font-bold text-primary/4 rotate-3">✕</span>
        <span className="absolute bottom-[4%] left-[6%] text-[16vw] font-bold text-primary/4 -rotate-12">□</span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-10 px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="space-y-5">
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.5em]">
            PlayStation Network
          </p>
          <h1 className="text-7xl md:text-[10rem] font-extrabold tracking-tighter uppercase italic leading-none drop-shadow-[0_0_60px_rgba(0,87,184,0.25)]">
            Trophy
            <br />
            <span className="text-primary">Hub</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-sm mx-auto leading-relaxed">
            Track your trophy collection, explore your progress and show off your achievements.
          </p>
        </div>

        <Button asChild variant="psn" size="xl">
          <Link href="/dashboard">View Trophies</Link>
        </Button>
      </div>
    </main>
  )
}
