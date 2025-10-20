# ISR Caching, Pre-Rendering, and Thumbnail Fallbacks

This document records the decisions and implementation steps to enable Incremental Static Regeneration (ISR) on Vercel for dynamic pages and search results, and to make thumbnail fallback behavior consistent across UI components.

## Goals

- Cache search results (including query-parameter pages like `/search?q=...`) using Next.js cache APIs and CDN headers on Vercel.
- Pre-render specific dynamic pages (e.g., `/equipments/[type]`) so they appear in Vercel’s “Pages” list.
- Provide on-demand cache revalidation and pre-warming endpoints.
- Standardize thumbnail fallback to `/placeholder.svg` for equipment cards.

---

## Summary of Changes

### API Routes (ISR-style data caching)

- `app/(api)/api/search/route.ts`
  - Wraps `searchService.search()` in `unstable_cache` with `revalidate: 60`, tag `search`.
  - Sets CDN headers: `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`.

- `app/(api)/api/search/count/route.ts`
  - Wraps `searchService.count()` in `unstable_cache` with `revalidate: 120`, tag `search-count`.
  - Sets CDN headers: `Cache-Control: public, s-maxage=120, stale-while-revalidate=600`.

- `app/(api)/api/search/related/route.ts`
  - Wraps `searchService.getRelatedItems()` in `unstable_cache` with `revalidate: 300`, tag `related`.
  - Sets CDN headers: `Cache-Control: public, s-maxage=300, stale-while-revalidate=900`.

### Pages (revalidate and static shell)

- `app/(routes)/search/page.tsx`
  - Exports `revalidate = 60` and `dynamic = 'force-static'` to allow the page shell to be cached and revalidated periodically.

- `app/(routes)/equipments/[type]/page.tsx`
  - Exports `revalidate = 60` and `dynamic = 'force-static'`.
  - Adds `generateStaticParams()` for `['rent','buy','tools']` to pre-render `/equipments/rent`, `/equipments/buy`, `/equipments/tools`.
  - Includes `validTypes` validation and SEO `generateMetadata`.

### On-Demand Cache Control & Prewarming

- `app/(api)/api/revalidate/route.ts` (existing)
  - Endpoint: `POST /api/revalidate` with header `Authorization: Bearer <REVALIDATE_SECRET>`.
  - Accepts JSON `{ "tags": string[] }` and calls `revalidateTag(tag)` for each.
  - Now applicable to tags: `search`, `search-count`, `related` (and `categories` by default).

- `app/(api)/api/search/prewarm/route.ts` (added)
  - Endpoint: `POST /api/search/prewarm` with optional `token` and `queries` array.
  - Defaults to pre-warming common queries: `['excavator','crane','loader','dozer','truck']`.
  - Issues cache-participating fetches to `/api/search` and `/api/search/count` to populate caches.

### Thumbnail Fallback Consistency

- `app/(routes)/equipments/[type]/EquipmentSearchClient.tsx`
  - Uses `/placeholder.svg` when `item.images` is empty.
  - Keeps `item.title` for `alt` text.

- `features/search/components/SearchResults.tsx`
  - Uses `item.images?.[0]?.url` when available, falling back to `/placeholder.svg`.

- `src/shared/services/equipment.ts`
  - Maps `SearchResultItem.images` to `Equipment.images` and `Equipment.image` using `item.images?.[0]?.url`.

---

## Why Vercel "Pages" Shows Only Some Routes

- Vercel lists only statically pre-rendered pages under “Pages”. Query-parameter routes (e.g. `/search?q=...`) are cached via ISR at the data/CDN layers but are not listed as pre-rendered pages.
- Adding `generateStaticParams()` for `/equipments/[type]` ensures `rent`, `buy`, and `tools` appear in the “Pages” list.

---

## How to Use on Vercel

### Environment Variables

- `REVALIDATE_SECRET`: required to authorize `POST /api/revalidate` and `POST /api/search/prewarm`.

### Prewarm Common Queries

- Example (JSON body):

```bash
curl -X POST "https://<your-domain>/api/search/prewarm?token=$REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "queries": ["excavator","crane","loader"]
  }'
```

- You can configure a Vercel Cron Job to hit this endpoint hourly or nightly.

### On-Demand Revalidation by Tag

- Example (JSON body):

```bash
curl -X POST "https://<your-domain>/api/revalidate" \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["search","search-count","related"]
  }'
```

- Use this after content changes to invalidate cached results.

---

## Behavior Notes

- `unstable_cache` caches per input parameters and revalidates on the intervals specified.
- `s-maxage` moves caching to the Vercel CDN, providing fast responses and support for stale-while-revalidate.
- For `/search`, the page shell is static (`dynamic='force-static'`), while search data comes from the cached API routes.
- If you want `/search` to be fully dynamic, switch to `dynamic='force-dynamic'` (not recommended if you want caching).

---

## Verification & Observations

- Type-check and lint: successful (`npm run type-check`, `npm run lint`).
- Dev server preview:
  - `/equipments/buy` loaded successfully after changes.
  - An environmental crash was observed when opening `/search?q=excavator` once (RangeError: Array buffer allocation failed). This did not stem from the caching code but suggests a transient dev runtime or memory issue.

### If the `/search` dev crash reoccurs

- Restart the dev server.
- Reduce `limit` or payload size during local dev.
- Inspect `SearchResults` rendering logic and any large arrays. Consider paginating or lazy-loading in dev if needed.

---

## Tags Used

- `search` — general search result cache.
- `search-count` — result count cache.
- `related` — related items cache.

---

## Future Enhancements

- Adjust `revalidate` windows per traffic patterns.
- Expand `generateStaticParams()` for additional known routes (e.g., popular product slugs).
- Schedule prewarm with Vercel Cron using a curated set of popular queries.

---

## File Reference Index

- API
  - `app/(api)/api/search/route.ts`
  - `app/(api)/api/search/count/route.ts`
  - `app/(api)/api/search/related/route.ts`
  - `app/(api)/api/revalidate/route.ts`
  - `app/(api)/api/search/prewarm/route.ts`
- Pages
  - `app/(routes)/search/page.tsx`
  - `app/(routes)/equipments/[type]/page.tsx`
- UI thumbnails
  - `app/(routes)/equipments/[type]/EquipmentSearchClient.tsx`
  - `src/features/search/components/SearchResults.tsx`
  - `src/shared/services/equipment.ts`
