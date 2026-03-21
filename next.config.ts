import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.psncdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.playstation.net',
      },
      {
        protocol: 'https',
        hostname: '**.np.community.playstation.net',
      },
    ],
  },
}

export default nextConfig
