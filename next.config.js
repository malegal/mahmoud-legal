/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
  async redirects() {
    return [
      {
        source: '/article.html',
        destination: '/article/:slug',
        permanent: true,
      },
      {
        source: '/news.html',
        destination: '/news/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
