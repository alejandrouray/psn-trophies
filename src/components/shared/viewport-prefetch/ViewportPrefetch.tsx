'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { ViewportPrefetchProps } from './ViewportPrefetch.types'

/**
 * Calls `router.prefetch(href)` when the sentinel enters the viewport.
 * Useful on touch devices where Link hover-prefetch does not run.
 */
export function ViewportPrefetch({ href }: ViewportPrefetchProps) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      router.prefetch(href)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          router.prefetch(href)
          observer.disconnect()
        }
      },
      { rootMargin: '160px 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [href, router])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  )
}
