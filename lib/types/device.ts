export type DeviceStatus = "online" | "offline" | "maintenance" | "error"
export type DeviceType = "sensor" | "drone" | "gateway" | "controller"

export interface Device {
  id: string
  name: string
  type: DeviceType
  status: DeviceStatus
  location: {
    lat: number
    lng: number
  }
  lastSeen: Date
  firmware: string
  batteryLevel?: number
  telemetry: {
    temperature?: number
    humidity?: number
    pressure?: number
    altitude?: number
    speed?: number
  }
}

export interface DroneSpecific {
  flightTime: number
  maxAltitude: number
  maxSpeed: number
  currentMission?: string
  remainingBattery: number
  status: "grounded" | "in-flight" | "returning" | "charging"
}

