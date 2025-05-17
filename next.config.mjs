/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
  // Optional: Add if you need to allow specific development origins
  allowedDevOrigins: process.env.NODE_ENV === 'development' 
    ? ['192.168.0.112'] 
    : [],
};

export default nextConfig;