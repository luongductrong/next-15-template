type PrefetchUrls = string[];

export const prefetchUrls: PrefetchUrls = [];

const prefetchBaseUrl = process.env.NEXT_PUBLIC_PREFETCH_BASE_URL;
if (prefetchBaseUrl) {
  prefetchUrls.push(prefetchBaseUrl);
}
