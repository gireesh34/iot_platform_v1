"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DroneFleet } from "@/components/app/drones/drone-fleet"
import { LiveTelemetry } from "@/components/app/drones/live-telemetry"
import { WeatherInfo } from "@/components/app/drones/weather-info"
import dynamic from 'next/dynamic'
import { drones, missions } from "@/lib/mockData"

// Dynamically import MapContainer to avoid SSR issues with Leaflet
const DynamicMap = dynamic(() => import('@/components/map/DynamicMap'), {
  ssr: false,
  loading: () => <p>Loading Map...</p>
})

interface Mission {
  id: string
  name: string
  status: string
  droneId: string
}

export function Dashboard() {
  const [activeMissions, setActiveMissions] = useState<Mission[]>([])

  useEffect(() => {
    setActiveMissions(missions.filter((mission) => mission.status === "IN_PROGRESS"))
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DroneFleet />
        </div>
        <div>
          <WeatherInfo />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Missions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {activeMissions.map((mission) => (
                <li key={mission.id} className="flex justify-between items-center p-2 bg-secondary rounded-lg">
                  <span>{mission.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Drone: {drones.find((d) => d.id === mission.droneId)?.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drone Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <DynamicMap />
          </CardContent>
        </Card>
      </div>
      
      <LiveTelemetry />
    </div>
  )
}

