import type { PSNGame, PSNPlatform } from '@types'

export interface GameCardProps {
  game: PSNGame
  index: number
}

export interface GameCardImageProps {
  src: string
  alt: string
  priority: boolean
}

export interface GameCardHeaderProps {
  title: string
  lastUpdated: string
  dateRaw: string
}

export interface GameCardFooterProps {
  progress: number
  platforms: PSNPlatform[]
}
