import { ErrorState } from '@components'
import { getUserOverview } from '@services/psn'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProfileSection, ProfileSkeleton } from './_components'

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getUserOverview()

  return {
    title: profile?.onlineId ? `${profile.onlineId} — Profile` : 'Profile',
    description: `PlayStation Network profile and trophy stats.`,
  }
}

export default function ProfilePage() {
  if (!process.env.PSN_NPSSO) {
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

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary via-background to-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileSection />
        </Suspense>
      </div>
    </main>
  )
}
