import { IMAGE_BASE_URL } from '@/shared/constants/cdn';

// Resolve a stored image name to a usable URL. If already absolute, return as-is.
const IS_PLACEHOLDER_BASE = IMAGE_BASE_URL.includes('example.com');

export function resolveImageUrl(name?: string | null): string {
  if (!name) return '';
  const trimmed = String(name).trim();
  // Already absolute (http/https or protocol-relative)
  if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;
  // Data URLs or other non-http sources
  if (trimmed.startsWith('data:')) return trimmed;
  const cleanName = trimmed.replace(/^\/+/, '');
  // If CDN base is not configured, fall back to local placeholder to avoid server fetch errors
  if (IS_PLACEHOLDER_BASE) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${cleanName}`;
}

// Map files array from Postgres view to app ImageInfo[]
export function mapFilesToImages(
  files: Array<{ id: number; name: string; isdefault: boolean; adid: number }> | null | undefined
): { url: string; isDefault: boolean }[] {
  if (!files || files.length === 0) return [];
  return files.map(f => ({ url: resolveImageUrl(f.name), isDefault: !!f.isdefault }));
}
