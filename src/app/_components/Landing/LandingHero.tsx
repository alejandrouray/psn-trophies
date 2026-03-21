import { Button } from '@components'
import Link from 'next/link'

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative z-10 flex flex-col items-center text-center gap-10 px-6 animate-in fade-in slide-in-from-bottom-6 duration-700"
    >
      <div className="space-y-5">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.5em]">
          PlayStation Network
        </p>
        <h1
          id="hero-heading"
          className="text-7xl md:text-[10rem] font-extrabold tracking-tighter uppercase italic leading-none drop-shadow-[0_0_60px_rgba(0,87,184,0.25)]"
        >
          Trophy <span className="text-primary block">Hub</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-sm mx-auto leading-relaxed">
          Track your trophy collection, explore your progress and show off your achievements.
        </p>
      </div>

      <Button asChild variant="psn" size="xl">
        <Link href="/dashboard">View Trophies</Link>
      </Button>
    </section>
  )
}
