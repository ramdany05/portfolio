/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
