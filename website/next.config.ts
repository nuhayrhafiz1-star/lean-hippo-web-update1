import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — produces a plain /out folder you can upload to
  // any host (Hostinger shared/web hosting included). No Node server needed,
  // so there is nothing to crash and a CDN/Apache can serve it to thousands
  // of concurrent visitors with minimal latency.
  output: "export",

  // Emit /business-systems/index.html so Apache/LiteSpeed serve clean URLs.
  trailingSlash: true,

  // The export target has no Next image optimizer at runtime.
  images: { unoptimized: true },

  // Fail the build on type errors so we never ship a broken bundle.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
