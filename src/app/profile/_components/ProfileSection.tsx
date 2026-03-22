import { getUserOverview } from '@services/psn'
import { ProfileHero } from './ProfileHero'
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

      <ProfileRecentActivity titles={titles} />
    </div>
  )
}
