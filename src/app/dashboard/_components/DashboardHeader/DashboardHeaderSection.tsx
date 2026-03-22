import { getUserOverview } from '@services/psn'
import { DashboardHeader } from './DashboardHeader'

export async function DashboardHeaderSection() {
  const { profile, trophySummary } = await getUserOverview()

  return <DashboardHeader profile={profile} trophySummary={trophySummary} />
}
