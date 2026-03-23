import './globals.css'
import { ViewTransition } from 'react'
import { geistMono, geistSans, metadata } from './metadata'
import { AppNav } from './_components/AppNav'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col text-foreground"
        suppressHydrationWarning={true}
      >
        <AppNav />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  )
}
