import { cn } from '@lib'
import { Slot } from 'radix-ui'
import type { BadgeProps } from './Badge.types'
import { badgeVariants } from './Badge.variants'

export function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
