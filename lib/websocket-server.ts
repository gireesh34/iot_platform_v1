import { WebSocketServer, WebSocket } from "ws"
import { parse } from "url"
import { verify } from "@/lib/jwt"
import { supabaseServer as createServerClient } from "@/utils/supabase/server"
import type { CustomWebSocket, WebSocketMessage } from "@/lib/types/websocket"
import type { IncomingMessage } from "http"

const wss = new WebSocketServer({ noServer: true })
const supabase = createServerClient()

export function setupWebSocketServer(server: any) {
  server.on("upgrade", async (request: IncomingMessage, socket: any, head: any) => {
    const { pathname } = parse(request.url || '')

    try {
      const token = request.headers["sec-websocket-protocol"]
      const decoded = await verify(Array.isArray(token) ? token[0] : token || '')
      const userId = decoded?.sub

      if (!decoded || !userId) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
        socket.destroy()
        return
      }

      if (pathname?.startsWith("/devices/")) {
        const deviceId = pathname.split("/")[2]
        await handleDeviceConnection(wss, request, socket, head, deviceId, userId)
      } else if (pathname?.startsWith("/drones/")) {
        const droneId = pathname.split("/")[2]
        await handleDroneConnection(wss, request, socket, head, droneId, userId)
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
        socket.destroy()
      }
    } catch (err) {
      console.error('WebSocket connection error:', err)
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
      socket.destroy()
    }
  })
}

async function handleDeviceConnection(
  wss: WebSocketServer,
  request: IncomingMessage,
  socket: any,
  head: any,
  deviceId: string,
  userId: string
) {
  try {
    const { data: device } = await supabase
      .from('devices')
      .select('user_id')
      .eq('id', deviceId)
      .single()

    if (!device || device.user_id !== userId) {
      socket.write("HTTP/1.1 403 Forbidden\r\n\r\n")
      socket.destroy()
      return
    }

    wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
      const customWs = ws as CustomWebSocket
      customWs.userId = userId
      customWs.isAlive = true

      customWs.on('message', async (rawData) => {
        try {
          const { type, data } = JSON.parse(rawData.toString()) as WebSocketMessage

          switch (type) {
            case 'telemetry':
              await supabase
                .from('devices')
                .update({
                  status: data.status,
                  last_seen: new Date().toISOString(),
                  telemetry: data.telemetry,
                  battery_level: data.batteryLevel
                })
                .eq('id', deviceId)
                .eq('user_id', userId)
              break

            case 'status':
              await supabase
                .from('devices')
                .update({
                  status: data.status,
                  last_seen: new Date().toISOString()
                })
                .eq('id', deviceId)
                .eq('user_id', userId)
              break
          }

          // Broadcast to authorized clients
          wss.clients.forEach((client: WebSocket) => {
            const customClient = client as CustomWebSocket
            if (customClient !== customWs && 
                customClient.readyState === WebSocket.OPEN && 
                customClient.userId === userId) {
              customClient.send(JSON.stringify({ type, data, deviceId }))
            }
          })
        } catch (error) {
          console.error('Error handling device message:', error)
        }
      })

      customWs.on('close', () => {
        console.log(`Device ${deviceId} disconnected`)
        customWs.isAlive = false
      })
    })
  } catch (error) {
    console.error('Error in device connection:', error)
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n")
    socket.destroy()
  }
}

async function handleDroneConnection(
  wss: WebSocketServer,
  request: IncomingMessage,
  socket: any,
  head: any,
  droneId: string,
  userId: string
) {
  try {
    const { data: drone } = await supabase
      .from('drones')
      .select('user_id')
      .eq('id', droneId)
      .single()

    if (!drone || drone.user_id !== userId) {
      socket.write("HTTP/1.1 403 Forbidden\r\n\r\n")
      socket.destroy()
      return
    }

    wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
      const customWs = ws as CustomWebSocket
      customWs.userId = userId
      customWs.isAlive = true

      customWs.on('message', async (rawData) => {
        try {
          const { type, data } = JSON.parse(rawData.toString()) as WebSocketMessage

          switch (type) {
            case 'telemetry':
              await supabase
                .from('drones')
                .update({
                  status: data.status,
                  location: data.location,
                  telemetry: data.telemetry,
                  battery_level: data.batteryLevel,
                  updated_at: new Date().toISOString()
                })
                .eq('id', droneId)
                .eq('user_id', userId)
              break

            case 'location':
              await supabase
                .from('drones')
                .update({
                  location: data.location,
                  updated_at: new Date().toISOString()
                })
                .eq('id', droneId)
                .eq('user_id', userId)
              break
          }

          // Broadcast to authorized clients
          wss.clients.forEach((client: WebSocket) => {
            const customClient = client as CustomWebSocket
            if (customClient !== customWs && 
                customClient.readyState === WebSocket.OPEN && 
                customClient.userId === userId) {
              customClient.send(JSON.stringify({ type, data, droneId }))
            }
          })
        } catch (error) {
          console.error('Error handling drone message:', error)
        }
      })

      customWs.on('close', () => {
        console.log(`Drone ${droneId} disconnected`)
        customWs.isAlive = false
      })
    })
  } catch (error) {
    console.error('Error in drone connection:', error)
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n")
    socket.destroy()
  }
}

// Setup ping interval to keep connections alive
const interval = setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {
    const customWs = ws as CustomWebSocket
    if (customWs.isAlive === false) {
      return ws.terminate()
    }
    customWs.isAlive = false
    ws.ping()
  })
}, 30000)

