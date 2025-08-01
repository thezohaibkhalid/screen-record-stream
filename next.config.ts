const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bitrecord.b-cdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
