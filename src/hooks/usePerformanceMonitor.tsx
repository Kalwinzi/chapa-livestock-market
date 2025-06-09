
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export const usePerformanceMonitor = (pageName: string) => {
  const renderStartTime = useRef(performance.now());
  const metricsRef = useRef<PerformanceMetrics>({
    pageLoadTime: 0,
    renderTime: 0
  });

  useEffect(() => {
    // Measure page load time
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metricsRef.current.pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
    }

    // Measure render time
    const renderEndTime = performance.now();
    metricsRef.current.renderTime = renderEndTime - renderStartTime.current;

    // Measure memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metricsRef.current.memoryUsage = memory.usedJSHeapSize;
    }

    // Log performance metrics
    console.log(`[Performance] ${pageName}:`, {
      pageLoadTime: `${metricsRef.current.pageLoadTime.toFixed(2)}ms`,
      renderTime: `${metricsRef.current.renderTime.toFixed(2)}ms`,
      memoryUsage: metricsRef.current.memoryUsage ? `${(metricsRef.current.memoryUsage / 1024 / 1024).toFixed(2)}MB` : 'N/A'
    });

    // Send analytics (you can integrate with your analytics service)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_performance', {
        page_name: pageName,
        page_load_time: metricsRef.current.pageLoadTime,
        render_time: metricsRef.current.renderTime
      });
    }
  }, [pageName]);

  return metricsRef.current;
};
