import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Array of class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with proper separators and optional currency
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatNumber(
  num: number,
  options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    locale = "en-US",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    style: currency ? "currency" : "decimal",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);
}

/**
 * Format a date with flexible options
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options?: {
    locale?: string;
    format?: "short" | "medium" | "long" | "full";
    timeZone?: string;
  }
): string {
  const dateObj = new Date(date);
  const { locale = "en-US", format = "medium", timeZone } = options || {};

  return new Intl.DateTimeFormat(locale, {
    dateStyle: format,
    timeZone,
  }).format(dateObj);
}

/**
 * Generate a shimmer effect SVG for image loading
 * @param w - Width of the shimmer
 * @param h - Height of the shimmer
 * @param color - Base color of the shimmer
 * @returns SVG string
 */
export function shimmer(w: number, h: number, color: string = "#333"): string {
  const svg = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="${color}" offset="20%" />
          <stop stop-color="${adjustColor(color, -20)}" offset="50%" />
          <stop stop-color="${color}" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${color}" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>
  `.trim();
  return svg;
}

/**
 * Adjust a hex color by a percentage
 * @param color - Hex color string
 * @param percent - Percentage to adjust (-100 to 100)
 * @returns Adjusted hex color
 */
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return "#" + (
    0x1000000 +
    (Math.min(Math.max(R, 0), 255)) * 0x10000 +
    (Math.min(Math.max(G, 0), 255)) * 0x100 +
    Math.min(Math.max(B, 0), 255)
  ).toString(16).slice(1);
}

/**
 * Convert a string to base64
 * @param str - String to convert
 * @returns Base64 encoded string
 */
export function toBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

/**
 * Get initials from a name with customizable options
 * @param name - Full name
 * @param options - Options for generating initials
 * @returns Initials string
 */
export function getInitials(
  name: string,
  options?: {
    maxLength?: number;
    separator?: string;
    uppercase?: boolean;
  }
): string {
  const { maxLength = 2, separator = "", uppercase = true } = options || {};
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join(separator);
  
  const result = initials.slice(0, maxLength);
  return uppercase ? result.toUpperCase() : result;
}

/**
 * Create a debounced version of a function with proper typing
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @param options - Debounce options
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  }
): T {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCall = 0;
  const { leading = false, trailing = true, maxWait } = options || {};

  function executedFunction(this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    const isLeading = leading && !timeout;

    lastArgs = args;

    if (isLeading) {
      func.apply(this, args);
      lastCall = now;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      const shouldCall = trailing && lastArgs && (!leading || (now - lastCall) >= wait);
      if (shouldCall && lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
        lastCall = now;
      }
      timeout = null;
    }, wait);

    if (maxWait && lastArgs && (now - lastCall) >= maxWait) {
      func.apply(this, lastArgs);
      lastArgs = null;
      lastCall = now;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    }
  }

  return executedFunction as T;
}

/**
 * Generate a cryptographically secure unique ID
 * @param length - Length of the ID
 * @returns Unique ID string
 */
export function generateId(length: number = 21): string {
  const crypto = typeof window !== "undefined" ? window.crypto : require("crypto");
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(36).padStart(2, "0")).join("").slice(0, length);
}

/**
 * Generate metadata for SEO with enhanced options
 * @param options - SEO metadata options
 * @returns SEO metadata object
 */
export function generateMetadata(options: {
  title: string;
  description: string;
  image?: string;
  type?: string;
  locale?: string;
  site?: string;
  keywords?: string[];
  author?: string;
}) {
  const {
    title,
    description,
    image,
    type = "website",
    locale = "en_US",
    site = "RK INSTITUTION",
    keywords = [],
    author,
  } = options;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    author,
    openGraph: {
      title,
      description,
      type,
      locale,
      site_name: site,
      images: image ? [{ url: image, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

/**
 * Create a cache with optional TTL and eviction callbacks
 * @param options - Cache options
 * @returns Cache instance
 */
export function createCache<T>(options?: {
  ttl?: number;
  maxSize?: number;
  onEvict?: (key: string, value: T) => void;
}) {
  const cache = new Map<string, { value: T; timestamp: number; expires: number }>();
  const { 
    ttl = 1000 * 60 * 60, // 1 hour default TTL
    maxSize = 100, // Default max size
    onEvict 
  } = options || {};

  function evictExpired() {
    const now = Date.now();
    Array.from(cache.entries()).forEach(([key, entry]) => {
      if (entry.expires && entry.expires <= now) {
        cache.delete(key);
        onEvict?.(key, entry.value);
      }
    });
  }

  return {
    get(key: string): T | undefined {
      evictExpired();
      const item = cache.get(key);
      if (!item || Date.now() >= item.expires) {
        return undefined;
      }
      return item.value;
    },
    set(key: string, value: T, customTtl?: number) {
      evictExpired();
      if (cache.size >= maxSize) {
        // Remove oldest entry if cache is full
        let oldest = Date.now();
        let oldestKey = '';
        cache.forEach((item, key) => {
          if (item.timestamp < oldest) {
            oldest = item.timestamp;
            oldestKey = key;
          }
        });
        if (oldestKey) {
          const oldItem = cache.get(oldestKey);
          if (oldItem) {
            onEvict?.(oldestKey, oldItem.value);
          }
          cache.delete(oldestKey);
        }
      }
      const timestamp = Date.now();
      cache.set(key, {
        value,
        timestamp,
        expires: timestamp + (customTtl || ttl),
      });
    },
    has(key: string): boolean {
      evictExpired();
      return cache.has(key);
    },
    delete(key: string): boolean {
      const item = cache.get(key);
      if (item && onEvict) {
        onEvict(key, item.value);
      }
      return cache.delete(key);
    },
    clear() {
      if (onEvict) {
        cache.forEach((item, key) => onEvict(key, item.value));
      }
      cache.clear();
    },
    size(): number {
      evictExpired();
      return cache.size;
    },
  };
} 