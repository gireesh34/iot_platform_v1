export const users = [
  { id: "1", name: "John Doe", email: "john@example.com", password: "password123", role: "ADMIN" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password456", role: "OPERATOR" },
]

export const drones = [
  {
    id: "1",
    name: "Drone 1",
    model: "DJI Mavic Air 2",
    status: "IDLE",
    batteryLevel: 100,
    lastLocation: { lat: 40.7128, lng: -74.006 },
    operatorId: "1",
  },
  {
    id: "2",
    name: "Drone 2",
    model: "DJI Phantom 4 Pro",
    status: "IN_FLIGHT",
    batteryLevel: 75,
    lastLocation: { lat: 34.0522, lng: -118.2437 },
    operatorId: "2",
  },
]

export const missions = [
  {
    id: "1",
    name: "City Survey",
    status: "IN_PROGRESS",
    startTime: new Date().toISOString(),
    droneId: "1",
    operatorId: "1",
  },
  {
    id: "2",
    name: "Forest Inspection",
    status: "PLANNED",
    startTime: new Date(Date.now() + 86400000).toISOString(),
    droneId: "2",
    operatorId: "2",
  },
]

