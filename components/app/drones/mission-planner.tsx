"use client"

import { useState } from "react"
import { Map } from "@/components/map/Map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Play, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Waypoint {
  id: string
  lat: number
  lng: number
  altitude: number
  action?: "photo" | "video" | "sensor_reading"
}

export function MissionPlanner() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([])
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null)
  const [isAddingWaypoint, setIsAddingWaypoint] = useState(false)
  const [newWaypoint, setNewWaypoint] = useState({ lat: 0, lng: 0, altitude: 100 })

  const handleAddWaypoint = (lat: number, lng: number) => {
    const newWaypoint: Waypoint = {
      id: Math.random().toString(),
      lat,
      lng,
      altitude: 100, // Default altitude
    }
    setWaypoints([...waypoints, newWaypoint])
    toast({
      title: "Waypoint Added",
      description: `Added waypoint at ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    })
  }

  const handleSaveMission = async () => {
    try {
      const response = await fetch("/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ waypoints }),
      })

      if (!response.ok) throw new Error("Failed to save mission")

      toast({
        title: "Mission Saved",
        description: "Your mission has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save mission. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mission Planner</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSaveMission}>
            <Save className="mr-2 h-4 w-4" /> Save Mission
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" /> Start Mission
          </Button>
        </div>
      </div>

      <div className="h-[500px] rounded-lg border">
        <Map onClickMap={handleAddWaypoint} markers={waypoints} onMarkerClick={setSelectedWaypoint} />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Waypoint Manually
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Waypoint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>Latitude</label>
                <Input 
                  type="number" 
                  step="0.000001" 
                  value={newWaypoint.lat}
                  onChange={(e) => setNewWaypoint({ ...newWaypoint, lat: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label>Longitude</label>
                <Input 
                  type="number" 
                  step="0.000001"
                  value={newWaypoint.lng}
                  onChange={(e) => setNewWaypoint({ ...newWaypoint, lng: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label>Altitude (meters)</label>
              <Input 
                type="number"
                value={newWaypoint.altitude}
                onChange={(e) => setNewWaypoint({ ...newWaypoint, altitude: parseFloat(e.target.value) })}
              />
            </div>
            <Button 
              className="w-full"
              onClick={() => {
                handleAddWaypoint(newWaypoint.lat, newWaypoint.lng)
                setIsAddingWaypoint(false)
              }}
            >
              Add Waypoint
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

