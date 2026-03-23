'use client'

import { cn } from '@lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from './AppNav.constants'

export function AppNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-12 flex items-center gap-1">
        <Link
          href="/"
          className="mr-4 text-sm font-extrabold tracking-tighter uppercase italic text-foreground hover:text-primary transition-colors"
        >
          Trophy <span className="text-primary">Hub</span>
        </Link>

        <ul className="flex items-center gap-1 list-none">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-widest transition-colors',
                  isActive(href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
                )}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
