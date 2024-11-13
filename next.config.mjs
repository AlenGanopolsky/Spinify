/** @type {import('next').NextConfig} */
import 'dotenv/config';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  
  webpack(config, options) {
    console.log('Environment Variables:', process.env); // Log environment variables
    return config;
  },
};

export default nextConfig;