import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  { title: "Total Flights", value: "1,234" },
  { title: "Flight Hours", value: "567" },
  { title: "Active Drones", value: "45" },
  { title: "Completed Missions", value: "89" },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

