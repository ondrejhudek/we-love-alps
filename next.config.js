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
      {
        protocol: "https",
        hostname: "laicmrkbwfhogqcl.public.blob.vercel-storage.com",
        port: "",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 3600, // 1 hour
  },
};

module.exports = nextConfig;
