import { getUserOverview } from '@services/psn'
import { ProfileHero } from './ProfileHero'
import { ProfilePlatformBreakdown } from './ProfilePlatformBreakdown'
import { ProfileRecentActivity } from './ProfileRecentActivity'
import { ProfileStats } from './ProfileStats'

export async function ProfileSection() {
  const { profile, trophySummary, titles, totalItemCount } =
    await getUserOverview()

  return (
    <div className="space-y-8">
      <ProfileHero profile={profile} trophySummary={trophySummary} />

      <ProfileStats
        totalItemCount={totalItemCount}
        titles={titles}
        earnedTrophies={trophySummary.earnedTrophies}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfilePlatformBreakdown titles={titles} />
        <ProfileRecentActivity titles={titles} />
      </div>
    </div>
  )
}
