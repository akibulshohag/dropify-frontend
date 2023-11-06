/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // images: {
  //   domains: [],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

}

module.exports = nextConfig
