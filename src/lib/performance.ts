/**
 * Performance Monitoring Utilities
 * Track web vitals and report to analytics
 */

export interface WebVitals {
  CLS: number; // Cumulative Layout Shift
  FID: number; // First Input Delay
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  TTFB: number; // Time to First Byte
}

/**
 * Report web vitals to analytics service
 */
export function reportWebVitals(metric: any) {
  const { name, value, id, rating } = metric;

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      rating,
      id,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      });
    }

    // Custom analytics endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          value,
          id,
          rating,
          timestamp: Date.now(),
        }),
      }).catch(() => {
        // Silently fail
      });
    }
  }
}

/**
 * Measure component render time
 */
export function measurePerformance(componentName: string, callback: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    callback();
    return;
  }

  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  performance.mark(startMark);
  callback();
  performance.mark(endMark);

  try {
    performance.measure(measureName, startMark, endMark);
    const measure = performance.getEntriesByName(measureName)[0];

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}: ${Math.round(measure.duration)}ms`);
    }

    // Cleanup
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  } catch (error) {
    // Silently fail
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        const src = target.dataset.src;
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
        }
        observer.unobserve(target);
      }
    });
  }, {
    rootMargin: '50px',
  });

  observer.observe(img);

  return () => observer.unobserve(img);
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload fonts
  const fonts = [
    '/fonts/inter-var.woff2',
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical JavaScript
 */
export function deferNonCriticalScripts() {
  if (typeof window === 'undefined') return;

  // Defer analytics
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load analytics scripts here
    });
  } else {
    setTimeout(() => {
      // Fallback for browsers without requestIdleCallback
    }, 1);
  }
}

/**
 * Monitor Core Web Vitals
 */
export async function monitorWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

    onCLS(reportWebVitals);
    onINP(reportWebVitals); // INP replaces FID in web-vitals v4
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}