// Base image URL for CDN or S3 bucket
// Configure via NEXT_PUBLIC_IMAGE_BASE_URL; fallback keeps path customizable.
export const IMAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://cdn.example.com'
).replace(/\/$/, '');
