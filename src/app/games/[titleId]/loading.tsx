import { TrophyListSkeleton } from './_components/TrophyList'

export default function GameLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <TrophyListSkeleton />
      </div>
    </main>
  )
}
