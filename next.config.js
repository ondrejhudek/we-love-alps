/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    minimumCacheTTL: 3600, // 1 hour
  },
};

module.exports = nextConfig;
