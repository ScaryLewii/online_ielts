/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return '2023-30-08-01'
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/signin',
        destination: 'https://ant-edu.ai/auth/login',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://apionline.ant-edu.ai/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

module.exports = nextConfig
