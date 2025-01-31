/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/levels/1",
        permanent: true,
      },
      {
        source: "/levels",
        destination: "/levels/1",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
