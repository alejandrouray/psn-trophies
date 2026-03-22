import { GameCard } from '@components'
import { getUserOverview } from '@services/psn'

export async function GamesGrid() {
  const { titles } = await getUserOverview()

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 list-none">
      {titles.map((game, index) => (
        <li key={game.npCommunicationId}>
          <GameCard game={game} index={index} />
        </li>
      ))}
    </ul>
  )
}
