/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  // إزالة redirects التي تسبب الخطأ
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
