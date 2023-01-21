/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/:email*/write",
        destination: "/:email*",
        permanent: false,
      },
      {
        source: "/:email*/:title*/edit",
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
