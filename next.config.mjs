/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["*"],
      allowedOrigins: [
        "pagoautomaticocontarjetasint.transbank.cl",
        "webpay3gint.transbank.cl",
      ],
    },
  },
};

export default nextConfig;
