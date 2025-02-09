"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Wind, Droplets, Thermometer } from "lucide-react"

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  conditions: string
}

const mockWeather: WeatherData = {
  temperature: 22,
  humidity: 65,
  windSpeed: 12,
  conditions: "Partly Cloudy"
}

export function WeatherInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Temperature</span>
            </div>
            <span className="text-sm font-medium">{mockWeather.temperature}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <span className="text-sm font-medium">{mockWeather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Wind Speed</span>
            </div>
            <span className="text-sm font-medium">{mockWeather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Conditions</span>
            </div>
            <span className="text-sm font-medium">{mockWeather.conditions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 