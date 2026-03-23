/** Same-origin paths only (excludes protocol-relative `//`). */
export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

const SKIP_PENDING_FOR_TARGET = new Set(['_blank', '_parent', '_top'])

export function isPlainPrimaryClick(event: MouseEvent): boolean {
  if (event.defaultPrevented) return false
  if (event.button !== 0) return false
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false
  }
  return true
}

/**
 * Resolves the `<a href>` that was clicked, including when the event target is a
 * nested element or text node.
 */
export function getInternalNavigationAnchor(
  event: MouseEvent,
): HTMLAnchorElement | null {
  const node = event.target
  if (!(node instanceof Node)) return null

  const root = node instanceof Element ? node : node.parentElement
  const el = root?.closest('a[href]')

  if (!el || !(el instanceof HTMLAnchorElement)) return null
  if (el.hasAttribute('download')) return null

  const target = el.target
  if (target && SKIP_PENDING_FOR_TARGET.has(target)) return null

  return el
}

/**
 * True when the anchor points to another in-app route (pathname or search differs).
 */
export function isInternalRouteChange(
  anchor: HTMLAnchorElement,
  currentPathname: string,
  currentSearch: string,
): boolean {
  const href = anchor.getAttribute('href')
  if (!href || !isInternalHref(href)) return false

  let url: URL
  try {
    url = new URL(href, window.location.origin)
  } catch {
    return false
  }

  return url.pathname !== currentPathname || url.search !== currentSearch
}
