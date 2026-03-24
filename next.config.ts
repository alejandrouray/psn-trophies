import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {
    root: '.',
  },
  experimental: {
    viewTransition: true,
  },
  cacheLife: {
    psn: {
      stale: 60,       // client serves cached for 1 minute without checking
      revalidate: 300, // background refresh every 5 minutes
      expire: 3600,    // expire after 1 hour of inactivity
    },
  },
  images: {
    remotePatterns: [
      { hostname: '**.psncdn.com' },
      { hostname: '**.playstation.net' },
      { hostname: '**.np.community.playstation.net' },
      { hostname: '**.playstation.com' },
    ],
  },
}

export default nextConfig
