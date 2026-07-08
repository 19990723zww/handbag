import type { NextConfig } from "next";

// GitHub Pages 等静态托管：NEXT_OUTPUT=export NEXT_BASE_PATH=/仓库名 npm run build
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      basePath: process.env.NEXT_BASE_PATH || "",
      trailingSlash: true,
    }
  : {
      async redirects() {
        return [
          { source: "/", destination: "/vi", permanent: false },
          {
            source: "/:page(san-pham|quy-trinh|gioi-thieu|lien-he)",
            destination: "/vi/:page",
            permanent: true,
          },
        ];
      },
    };

export default nextConfig;
