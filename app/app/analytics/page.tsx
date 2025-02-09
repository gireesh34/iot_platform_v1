import { Suspense } from "react"
import { AnalyticsChart } from "@/components/app/analytics/analytics-chart"
import { MetricsGrid } from "@/components/app/analytics/metrics-grid"
import { AlertsLog } from "@/components/app/analytics/alerts-log"
import { DateRangePicker } from "@/components/date-range-picker"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <DateRangePicker />
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <MetricsGrid />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Performance Trends</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <AnalyticsChart />
            </Suspense>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <AlertsLog />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

