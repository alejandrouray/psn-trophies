import type { ComponentProps } from 'react'

export interface ErrorStateProps extends ComponentProps<'section'> {
  title?: string
  description?: string | React.ReactNode
  icon?: string
}
