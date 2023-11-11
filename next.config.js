/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    minimumCacheTTL: 3600, // 1 hour
  },
};

module.exports = nextConfig;
