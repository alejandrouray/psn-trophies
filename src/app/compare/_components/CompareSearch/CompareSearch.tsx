'use client'

import { Button, Input } from '@components/ui'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import type { CompareSearchProps } from './CompareSearch.types'

export function CompareSearch({ defaultValue = '' }: CompareSearchProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const value = inputRef.current?.value.trim()

    if (!value) return

    router.push(`/compare?user=${encodeURIComponent(value)}`)
  }

  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">
          Compare with another player
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Enter a PSN Online ID to see how your trophy progress stacks up.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="PSN Online ID"
            defaultValue={defaultValue}
            className="pl-9"
            aria-label="PSN Online ID to compare with"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <Button type="submit" variant="psn">
          Compare
        </Button>
      </form>
    </div>
  )
}
