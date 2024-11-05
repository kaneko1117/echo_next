import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost"], // 追加で許可する安全なオリジンドメイン
    },
  },
};

export default nextConfig;
