import { cache } from "./cache";

const CONCURRENCY = 1;
let pendingRequests = 0;
const requestQueue: Array<() => void> = [];

async function waitForSlot(): Promise<void> {
  if (pendingRequests < CONCURRENCY) {
    pendingRequests++;
    return;
  }
  return new Promise<void>((resolve) => {
    requestQueue.push(() => {
      pendingRequests++;
      resolve();
    });
  });
}

function releaseSlot(): void {
  pendingRequests--;
  const next = requestQueue.shift();
  if (next) {
    next();
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJitteredBackoff(attempt: number): number {
  const baseDelay = 500;
  const maxDelay = 8000;
  const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  const jitter = Math.random() * 0.3 * exponentialDelay;
  return exponentialDelay + jitter;
}

function isRetryableError(error: any): boolean {
  if (error?.status === 429) return true;
  if (error?.status >= 500 && error?.status < 600) return true;
  if (error?.error?.code === 4) return true;
  if (error?.error?.error_subcode === 2446079) return true; // rate limit
  if (error?.error?.message?.toLowerCase().includes("too many calls")) return true;
  return false;
}

function getCacheKey(url: string, params: Record<string, string>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return `${url}?${sortedParams}`;
}

export async function metaFetch<T>(
  url: string,
  params: Record<string, string> = {},
  options: {
    ttl?: number;
    maxRetries?: number;
  } = {}
): Promise<T> {
  const { ttl = 60000, maxRetries = 5 } = options;
  const cacheKey = getCacheKey(url, params);

  const cached = cache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error("META_ACCESS_TOKEN not configured");
  }

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await waitForSlot();
      try {
        const response = await fetch(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error: any = {
            status: response.status,
            error: errorData.error || { message: response.statusText },
          };
          throw error;
        }

        const data = await response.json();
        releaseSlot();
        cache.set(cacheKey, data, ttl);
        return data as T;
      } catch (error) {
        releaseSlot();
        throw error;
      }
    } catch (error: any) {
      lastError = error;
      if (attempt < maxRetries && isRetryableError(error)) {
        const backoff = getJitteredBackoff(attempt);
        await delay(backoff);
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error("Request failed");
}

export function formatMetaError(error: any): string {
  if (error?.error?.message) {
    return `Meta API hatası: ${error.error.message}`;
  }
  if (error?.message) {
    return `Meta API hatası: ${error.message}`;
  }
  return "Meta API hatası: Bilinmeyen hata";
}

