'use client'

import { cn } from '@lib'
import { Progress as ProgressPrimitive } from 'radix-ui'
import type { ProgressProps } from './Progress.types'

export function Progress({
  className,
  value,
  indicatorClassName,
  indicatorStyle,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative flex h-1.5 w-full items-center overflow-hidden rounded-full bg-secondary border border-border',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'size-full flex-1 bg-primary transition-all duration-1000',
          indicatorClassName,
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          ...indicatorStyle,
        }}
      />
    </ProgressPrimitive.Root>
  )
}
