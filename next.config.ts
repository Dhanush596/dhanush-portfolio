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
      {
        source: '/work/gstore',
        destination: '/work/online-grocery-store',
        permanent: false,
      },
      {
        source: '/work/hangerhome',
        destination: '/work/hanger-commerce',
        permanent: false,
      },
      {
        source: '/work/sri-seetharama',
        destination: '/work/sri-seetarama',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
