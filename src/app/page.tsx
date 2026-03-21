import { LandingBackground, LandingHero } from '@app/_components/Landing'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <LandingBackground />
      <LandingHero />
    </main>
  )
}
