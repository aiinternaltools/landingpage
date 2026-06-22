import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/ro/ro/:path*",
        destination: "/ro/:path*",
        permanent: false,
      },
      {
        source: "/en/en/:path*",
        destination: "/en/:path*",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/community",
        destination: "/en/community",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/en/about",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/en/login",
        permanent: true,
      },
      {
        source: "/ai-news",
        destination: "/en/ai-news",
        permanent: true,
      },
      {
        source: "/ai-news/:slug",
        destination: "/en/ai-news/:slug",
        permanent: true,
      },
      {
        source: "/marketing-audit",
        destination: "/en/marketing-audit",
        permanent: true,
      },
      {
        source: "/automation-audit",
        destination: "/en/automation-audit",
        permanent: true,
      },
      {
        source: "/use-cases/:path*",
        destination: "/en/use-cases/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
