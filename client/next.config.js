/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/:email*/write",
        destination: "/:email*",
        permanent: false,
      },
      {
        source: "/:email*/about/edit",
        destination: "/:email*/about",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
