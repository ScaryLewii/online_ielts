/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev }) => {
    const newConfig = config;

    if (!dev && newConfig.output.filename.startsWith('static')) {
        newConfig.output.filename = newConfig.output.filename.replace('[name]', `[name]-${buildId}`);
        newConfig.output.chunkFilename = newConfig.output.chunkFilename.replace('[name]', `[name]-${buildId}`);
    }

    return newConfig;
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return '2023-12-31-01'
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
        destination: 'https://apitest.ant-edu.ai/:path*',
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
