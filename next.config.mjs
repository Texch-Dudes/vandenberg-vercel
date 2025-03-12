/*  @type { import('next').NextConfig } */
import path from "path";

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join("/styles", "styles")],
  },
  images: {
    domains: [
      "vandenbergcarclassic-wp.grandsolution.dev",
      "145.223.116.99", // Add the IP address here
      "api.essencityh.com",
    ], // Add your image domains here
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  webpack: (config, { webpack, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: {
        loader: "svg-react-loader",
      },
    });

    // Ignore localStorage warnings
    config.ignoreWarnings = [
      // Ignore localStorage-related warnings
      /localStorage is not defined/,
      /window is not defined/,
    ];

    // Prevent server-side localStorage errors
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
