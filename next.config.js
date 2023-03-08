/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
