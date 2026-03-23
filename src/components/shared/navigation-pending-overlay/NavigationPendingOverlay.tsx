'use client'

import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAVIGATION_PENDING_TIMEOUT_MS } from './NavigationPendingOverlay.constants'
import type { NavigationPendingOverlayProps } from './NavigationPendingOverlay.types'
import {
  getInternalNavigationAnchor,
  isInternalRouteChange,
  isPlainPrimaryClick,
} from './NavigationPendingOverlay.utils'

export function NavigationPendingOverlay(
  _props: NavigationPendingOverlayProps,
) {
  const pathname = usePathname()
  const [pending, setPending] = useState(false)
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    pathnameRef.current = pathname
    setPending(false)
  }, [pathname])

  useEffect(() => {
    if (!pending) return
    const id = window.setTimeout(() => {
      setPending(false)
    }, NAVIGATION_PENDING_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [pending])

  useEffect(() => {
    const onDocumentClickCapture = (event: MouseEvent) => {
      if (!isPlainPrimaryClick(event)) return

      const anchor = getInternalNavigationAnchor(event)
      if (!anchor) return

      if (
        !isInternalRouteChange(
          anchor,
          pathnameRef.current,
          window.location.search,
        )
      ) {
        return
      }

      setPending(true)
    }

    document.addEventListener('click', onDocumentClickCapture, true)
    return () =>
      document.removeEventListener('click', onDocumentClickCapture, true)
  }, [])

  if (!pending) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-100 flex flex-col"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="h-1 w-full overflow-hidden bg-border/90 shadow-sm">
        <div className="nav-pending-bar h-full w-2/5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
      </div>
      <div className="flex flex-1 items-start justify-center pt-20">
        <Loader2
          className="size-9 text-primary motion-safe:animate-spin motion-reduce:animate-none opacity-90 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  )
}
