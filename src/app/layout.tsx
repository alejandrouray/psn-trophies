import './globals.css'
import { Suspense, ViewTransition } from 'react'
import { AppNav } from './_components/AppNav'
import { geistMono, geistSans, metadata } from './metadata'

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
        <Suspense fallback={null}>
          <AppNav />
        </Suspense>
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  )
}
