import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { hostname: '**.psncdn.com' },
      { hostname: '**.playstation.net' },
      { hostname: '**.np.community.playstation.net' },
    ],
  },
}

export default nextConfig
