import { prefetchBaseUrl } from '@/libs/environment';

type PrefetchUrls = string[];

const prefetchUrls: PrefetchUrls = [];
if (prefetchBaseUrl) {
  prefetchUrls.push(prefetchBaseUrl);
}

export { prefetchUrls };
