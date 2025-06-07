import type { NextConfig } from "next";

// Initialize bundle analyzer when ANALYZE env variable is true
const analyzeBundles = process.env.ANALYZE === 'true';
const withBundleAnalyzer = analyzeBundles 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    domains: ['images.unsplash.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Set reasonable device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Performance optimization
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets
        source: '/(.*).(jpg|jpeg|png|svg|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Export config with bundle analyzer wrapper
export default withBundleAnalyzer(nextConfig);
