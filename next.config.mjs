let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}`.replace('https://', ''),
      'rteatcvyvyktoeggdzad.supabase.co'
    ],
    unoptimized: true,
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV || 'development'
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization
    webpackBuildWorker: true,
  },
  output: process.env.VERCEL_ENV ? 'standalone' : undefined,
  distDir: process.env.VERCEL_ENV ? '.vercel/output' : '.next',
  poweredByHeader: false,
  reactStrictMode: true
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig