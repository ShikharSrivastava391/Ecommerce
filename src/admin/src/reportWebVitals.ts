import { ReportHandler } from "web-vitals"

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
  // NEW: Log all metrics for monitoring
  const logMetric = (metric: any) => console.log('Web Vitals:', { name: metric.name, value: Math.round(metric.value * 100) / 100 })
  return { getCLS: logMetric, getFID: logMetric, getFCP: logMetric, getLCP: logMetric, getTTFB: logMetric }  // Wrap with log
}

export default reportWebVitals