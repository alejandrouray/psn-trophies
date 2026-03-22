import { ProfileSkeleton } from './_components/ProfileSkeleton'

export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileSkeleton />
      </div>
    </main>
  )
}
