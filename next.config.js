/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  images: {
    // domains: [`api.le-fabre.com`],
    domains: [`cbu01.alicdn.com`],

    // domains: [`lefabre-api.b2gsoft.xyz`],
    // domains: [`192.168.68.113`],
  },

}

module.exports = nextConfig
