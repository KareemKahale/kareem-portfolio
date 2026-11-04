/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kareem-portfolio',
  assetPrefix: '/kareem-portfolio/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;