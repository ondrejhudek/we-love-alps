/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**" },
    ],
    minimumCacheTTL: 3600, // 1 hour
  },
};

module.exports = nextConfig;
