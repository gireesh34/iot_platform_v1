"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Signal, Wifi } from "lucide-react"

interface Drone {
  id: string
  name: string
  status: "active" | "idle" | "offline"
  batteryLevel: number
  signalStrength: number
  lastSeen: string
}

const mockDrones: Drone[] = [
  {
    id: "1",
    name: "Drone Alpha",
    status: "active",
    batteryLevel: 85,
    signalStrength: 92,
    lastSeen: "2 minutes ago"
  },
  {
    id: "2",
    name: "Drone Beta",
    status: "idle",
    batteryLevel: 65,
    signalStrength: 88,
    lastSeen: "5 minutes ago"
  },
  {
    id: "3",
    name: "Drone Gamma",
    status: "offline",
    batteryLevel: 20,
    signalStrength: 0,
    lastSeen: "2 hours ago"
  }
]

export function DroneFleet() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {mockDrones.map((drone) => (
        <Card key={drone.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {drone.name}
            </CardTitle>
            <Badge 
              variant={
                drone.status === "active" ? "default" :
                drone.status === "idle" ? "secondary" : "destructive"
              }
            >
              {drone.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Battery</span>
                </div>
                <span className="text-sm font-medium">{drone.batteryLevel}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Signal className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Signal</span>
                </div>
                <span className="text-sm font-medium">{drone.signalStrength}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Last Seen</span>
                </div>
                <span className="text-sm font-medium">{drone.lastSeen}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 