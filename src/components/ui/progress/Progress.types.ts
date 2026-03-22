import type { Progress as ProgressPrimitive } from 'radix-ui'
import type { ComponentProps, CSSProperties } from 'react'

export interface ProgressProps
  extends ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
  indicatorStyle?: CSSProperties
}
