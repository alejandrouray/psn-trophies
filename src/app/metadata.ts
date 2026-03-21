import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Trophy Hub',
  description: 'Explore your PlayStation Network trophy collection.',
}
