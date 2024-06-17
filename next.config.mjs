/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["*"],
      allowedOrigins: ["pagoautomaticocontarjetasint.transbank.cl"],
    },
  },
};

export default nextConfig;
