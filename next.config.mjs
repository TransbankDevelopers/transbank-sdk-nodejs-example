/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_CHILD_CC:
      process.env.TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_CHILD_CC,
  },
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["*"],
      allowedOrigins: [
        "pagoautomaticocontarjetasint.transbank.cl",
        "webpay3gint.transbank.cl",
      ],
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
