'use client'

import { Button, Input } from '@components'
import { cn } from '@lib'
import { Search } from 'lucide-react'
import { PLATFORMS, STATUSES } from './GamesGrid.constants'
import type { GamesGridFiltersProps, TitleFilters } from './GamesGrid.types'

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-full text-xs font-semibold tracking-wide',
        active &&
          'bg-primary border-primary text-primary-foreground shadow-[0_0_8px_rgba(0,87,184,0.4)]',
      )}
    >
      {children}
    </Button>
  )
}

export function GamesGridFilters({
  filters,
  totalCount,
  filteredCount,
  onFiltersChange,
}: GamesGridFiltersProps) {
  const set = (patch: Partial<TitleFilters>) =>
    onFiltersChange({ ...filters, ...patch })

  const isFiltered =
    filters.search !== '' ||
    filters.platform !== null ||
    filters.status !== 'all'

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search games..."
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            className="pl-9"
            aria-label="Search games by name"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <FilterPill
            active={filters.platform === null}
            onClick={() => set({ platform: null })}
          >
            All
          </FilterPill>
          {PLATFORMS.map(({ value, label }) => (
            <FilterPill
              key={value}
              active={filters.platform === value}
              onClick={() =>
                set({ platform: filters.platform === value ? null : value })
              }
            >
              {label}
            </FilterPill>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {STATUSES.map(({ value, label }) => (
            <FilterPill
              key={value}
              active={filters.status === value}
              onClick={() => set({ status: value })}
            >
              {label}
            </FilterPill>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-mono tabular-nums">
          {isFiltered ? (
            <>
              <span className="text-foreground font-semibold">
                {filteredCount}
              </span>
              {' / '}
              {totalCount} games
            </>
          ) : (
            <>{totalCount} games</>
          )}
        </p>
      </div>
    </div>
  )
}
