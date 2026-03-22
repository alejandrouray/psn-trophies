import { getGameTrophyDetails, getUserOverview } from '@services/psn'
import { notFound } from 'next/navigation'
import type { TrophyListProps } from './TrophyList.types'
import { TrophyListClient } from './TrophyListClient'

export async function TrophyList({ titleId }: TrophyListProps) {
  const { titles } = await getUserOverview()
  const game = titles.find((t) => t.npCommunicationId === titleId)

  if (!game) notFound()

  const { trophies, groups, totalCount, earnedCount } = await getGameTrophyDetails(
    titleId,
    game.npServiceName,
  )

  return (
    <TrophyListClient
      game={game}
      trophies={trophies}
      groups={groups}
      totalCount={totalCount}
      earnedCount={earnedCount}
    />
  )
}
