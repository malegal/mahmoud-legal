/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // تفعيل ضغط الكود باستخدام SWC
  compress: true, // تفعيل ضغط gzip
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
  // إعادة توجيه http إلى https تلقائياً
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://ostazlaw.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
