import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async redirects() {
    return [];
  },
};

// Make sure experimental mdx flag is enabled
const configWithMDX = {
  ...nextConfig,
  experimental: {
    mdxRs: true,
  },
};

const finalConfig = withBundleAnalyzer(withNextIntl(withMDX(configWithMDX)));

// Next.js 15 可能不再允许顶层的 turbopack 键，或者某些插件（如 fumadocs）错误地添加了它
if (finalConfig.turbopack) {
  finalConfig.experimental = {
    ...finalConfig.experimental,
    turbopack: finalConfig.turbopack,
  };
  delete finalConfig.turbopack;
}

export default finalConfig;
