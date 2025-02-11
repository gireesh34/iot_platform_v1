"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import type { Device } from "@/lib/types/device"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DeviceMonitorProps {
  deviceId: string
}

export function DeviceMonitor({ deviceId }: DeviceMonitorProps) {
  const [device, setDevice] = useState<Device | null>(null)
  const [telemetryHistory, setTelemetryHistory] = useState<any[]>([])

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const ws = new WebSocket(`wss://api.atom8ic.com/devices/${deviceId}`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setDevice(data.device)
      setTelemetryHistory((prev) => [...prev, data.telemetry].slice(-50))
    }

    return () => ws.close()
  }, [deviceId])

  if (!device) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{device.name}</span>
          <Badge variant={device.status === "online" ? "default" : "destructive"}>{device.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px]">
            <Line
              data={{
                labels: telemetryHistory.map((_, i) => i),
                datasets: [
                  {
                    label: "Temperature",
                    data: telemetryHistory.map((t) => t.temperature),
                    borderColor: "rgb(255, 99, 132)",
                    tension: 0.1,
                  },
                  {
                    label: "Humidity",
                    data: telemetryHistory.map((t) => t.humidity),
                    borderColor: "rgb(53, 162, 235)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Battery Level</p>
              <p className="text-2xl font-bold">{device.batteryLevel}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Firmware</p>
              <p className="text-2xl font-bold">{device.firmware}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

