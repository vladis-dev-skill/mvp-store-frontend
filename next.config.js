/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_GATEWAY_URL
          ? `${process.env.API_GATEWAY_URL}/api/:path*`
          : 'http://localhost:8090/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;