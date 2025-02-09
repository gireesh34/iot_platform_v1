"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapProps {
  onClickMap: (lat: number, lng: number) => void
  markers: Array<{ lat: number; lng: number; id: string }>
  onMarkerClick?: (marker: any) => void
}

export function Map({ onClickMap, markers, onMarkerClick }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map("map").setView([51.505, -0.09], 13)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      // Add click handler
      mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
        onClickMap(e.latlng.lat, e.latlng.lng)
      })
    }

    // Update markers
    markers.forEach(marker => {
      if (!markersRef.current[marker.id]) {
        const newMarker = L.marker([marker.lat, marker.lng])
          .addTo(mapRef.current!)
          .on("click", () => onMarkerClick?.(marker))
        
        markersRef.current[marker.id] = newMarker
      }
    })

    // Clean up removed markers
    Object.keys(markersRef.current).forEach(id => {
      if (!markers.find(m => m.id === id)) {
        markersRef.current[id].remove()
        delete markersRef.current[id]
      }
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = {}
      }
    }
  }, [markers, onClickMap, onMarkerClick])

  return <div id="map" className="h-full w-full" />
} 