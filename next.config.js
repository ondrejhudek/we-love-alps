/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/ddnasijv8/**",
      },
    ],
    minimumCacheTTL: 3600, // 1 hour
  },
};

module.exports = nextConfig;
