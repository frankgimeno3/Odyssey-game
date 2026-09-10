"use client";

import { useEffect } from 'react';

// Observe failures without intercepting or modifying application requests.
export default function ResourceDiagnostics() {
  useEffect(() => {
    const safeUrl = (value: string) => {
      try {
        const url = new URL(value, window.location.origin);
        return url.origin + url.pathname; // Exclude tokens and query parameters.
      } catch { return '(unknown URL)'; }
    };
    const failedResource = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const url = target.getAttribute('src') || target.getAttribute('href');
      if (url) console.error('[Odyssey][Resource][load-failed]', {
        url: safeUrl(url), element: target.tagName, route: window.location.pathname,
        hint: 'See Network for HTTP status. This can be an asset failure unrelated to Firestore.',
      });
    };
    window.addEventListener('error', failedResource, true);
    let observer: PerformanceObserver | undefined;
    if (typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes.includes('resource')) {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming & { responseStatus?: number };
          if (resource.responseStatus && resource.responseStatus >= 400) {
            console.error('[Odyssey][HTTP][failed]', {
              status: resource.responseStatus, url: safeUrl(resource.name),
              type: resource.initiatorType, route: window.location.pathname,
            });
          }
        }
      });
      observer.observe({ type: 'resource', buffered: true });
    }
    return () => {
      window.removeEventListener('error', failedResource, true);
      observer?.disconnect();
    };
  }, []);
  return null;
}
