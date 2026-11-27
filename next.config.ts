import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.137.1', 'localhost', '127.0.0.1'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'three', '@react-three/drei', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/work/intelligent-payroll-system',
        destination: '/work/payflow-payroll',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
