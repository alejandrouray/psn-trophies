import type { VariantProps } from 'class-variance-authority'
import type { badgeVariants } from './Badge.variants'

export type BadgeVariantProps = VariantProps<typeof badgeVariants>

export type BadgeProps = React.ComponentProps<'span'> &
  BadgeVariantProps & {
    asChild?: boolean
  }
