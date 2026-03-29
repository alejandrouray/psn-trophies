import { getUserOverview } from '@services/psn'
import { ProfileHero } from './ProfileHero'
import { ProfileInProgress } from './ProfileInProgress'
import { ProfileLibraryTrophyMix } from './ProfileLibraryTrophyMix'
import { ProfilePlatformBreakdown } from './ProfilePlatformBreakdown'
import { ProfileRecentPlatinums } from './ProfileRecentPlatinums'
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start">
        <div className="flex flex-col gap-8">
          <ProfilePlatformBreakdown titles={titles} />
          <ProfileRecentPlatinums titles={titles} />
        </div>
        <div className="flex flex-col gap-8">
          <ProfileInProgress titles={titles} />
          <ProfileLibraryTrophyMix titles={titles} />
        </div>
      </div>
    </div>
  )
}
