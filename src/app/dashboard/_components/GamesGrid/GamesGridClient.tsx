'use client'

import { GameCard } from '@components'
import type { TrophyTitle } from 'psn-api'
import { useState } from 'react'
import { DEFAULT_FILTERS } from './GamesGrid.constants'
import type { GamesGridClientProps, TitleFilters } from './GamesGrid.types'
import { GamesGridFilters } from './GamesGridFilters'

function filterTitles(
  titles: TrophyTitle[],
  filters: TitleFilters,
): TrophyTitle[] {
  return titles.filter((title) => {
    const matchesSearch =
      filters.search === '' ||
      title.trophyTitleName.toLowerCase().includes(filters.search.toLowerCase())

    const matchesPlatform =
      filters.platform === null ||
      (title.trophyTitlePlatform ?? '').includes(filters.platform)

    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'complete' && title.progress === 100) ||
      (filters.status === 'in-progress' &&
        title.progress > 0 &&
        title.progress < 100)

    return matchesSearch && matchesPlatform && matchesStatus
  })
}

export function GamesGridClient({ titles }: GamesGridClientProps) {
  const [filters, setFilters] = useState<TitleFilters>(DEFAULT_FILTERS)

  const filtered = filterTitles(titles, filters)

  return (
    <section aria-label="Games library" className="space-y-6">
      <GamesGridFilters
        filters={filters}
        totalCount={titles.length}
        filteredCount={filtered.length}
        onFiltersChange={setFilters}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-5xl" aria-hidden="true">
            🎮
          </span>
          <p className="text-lg font-semibold tracking-tight">No games found</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 list-none">
          {filtered.map((game, index) => (
            <li key={game.npCommunicationId}>
              <GameCard game={game} index={index} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
