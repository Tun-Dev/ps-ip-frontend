/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'boi-ip-is.s3.eu-north-1.amazonaws.com' }] },
};

export default nextConfig;
