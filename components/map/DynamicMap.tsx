"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { drones } from "@/lib/mockData"
import { useEffect } from "react"
import L from 'leaflet'

// Fix Leaflet marker icon issue
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function DynamicMap() {
  useEffect(() => {
    // Fix for map container not rendering properly
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <MapContainer 
      center={[0, 0]} 
      zoom={2} 
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {drones.map((drone) => (
        <Marker 
          key={drone.id} 
          position={[drone.lastLocation.lat, drone.lastLocation.lng]}
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium">{drone.name}</h3>
              <p className="text-sm text-muted-foreground">Status: {drone.status}</p>
              <p className="text-sm text-muted-foreground">Battery: {drone.batteryLevel}%</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 