import { WebSocketServer } from "ws"
import { parse } from "url"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const wss = new WebSocketServer({ noServer: true })

export function setupWebSocketServer(server: any) {
  server.on("upgrade", async (request: any, socket: any, head: any) => {
    const { pathname } = parse(request.url)

    // Verify authentication token
    try {
      const token = request.headers["sec-websocket-protocol"]
      const decoded = verify(token, process.env.JWT_SECRET!)

      if (!decoded) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
        socket.destroy()
        return
      }

      // Handle different WebSocket endpoints
      if (pathname?.startsWith("/devices/")) {
        const deviceId = pathname.split("/")[2]
        handleDeviceConnection(wss, request, socket, head, deviceId)
      } else if (pathname?.startsWith("/drones/")) {
        const droneId = pathname.split("/")[2]
        handleDroneConnection(wss, request, socket, head, droneId)
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
        socket.destroy()
      }
    } catch (err) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
      socket.destroy()
    }
  })
}

function handleDeviceConnection(wss: WebSocketServer, request: any, socket: any, head: any, deviceId: string) {
  wss.handleUpgrade(request, socket, head, (ws) => {
    ws.on("message", async (message) => {
      const data = JSON.parse(message.toString())

      // Update device status in database
      await prisma.device.update({
        where: { id: deviceId },
        data: {
          status: data.status,
          lastSeen: new Date(),
          telemetry: data.telemetry,
        },
      })

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      })
    })
  })
}

function handleDroneConnection(wss: WebSocketServer, request: any, socket: any, head: any, droneId: string) {
  wss.handleUpgrade(request, socket, head, (ws) => {
    ws.on("message", async (message) => {
      const data = JSON.parse(message.toString())

      // Update drone status in database
      await prisma.drone.update({
        where: { id: droneId },
        data: {
          status: data.status,
          location: data.location,
          telemetry: data.telemetry,
          batteryLevel: data.batteryLevel,
        },
      })

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      })
    })
  })
}

