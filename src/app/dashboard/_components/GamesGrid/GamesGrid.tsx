import { getUserOverview } from '@services/psn'
import { GamesGridClient } from './GamesGridClient'

export async function GamesGrid() {
  const { titles } = await getUserOverview()

  return <GamesGridClient titles={titles} />
}
