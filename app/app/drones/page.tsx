import { Suspense } from "react"
import { DroneFleet } from "@/components/app/drones/drone-fleet"
import { MissionPlanner } from "@/components/app/drones/mission-planner"
import { WeatherInfo } from "@/components/app/drones/weather-info"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveTelemetry } from "@/components/app/drones/live-telemetry" // Import LiveTelemetry

export default function DronesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Drone Fleet Control</h1>

      <Tabs defaultValue="fleet">
        <TabsList>
          <TabsTrigger value="fleet">Fleet Overview</TabsTrigger>
          <TabsTrigger value="missions">Mission Planning</TabsTrigger>
          <TabsTrigger value="telemetry">Live Telemetry</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet">
          <Suspense fallback={<LoadingSpinner />}>
            <DroneFleet />
          </Suspense>
        </TabsContent>

        <TabsContent value="missions">
          <div className="grid gap-6 md:grid-cols-2">
            <MissionPlanner />
            <WeatherInfo />
          </div>
        </TabsContent>

        <TabsContent value="telemetry">
          <Suspense fallback={<LoadingSpinner />}>
            <LiveTelemetry />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

