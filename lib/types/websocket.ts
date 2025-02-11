import { WebSocket, CloseEvent, MessageEvent } from 'ws'
import { type Database } from './database'

export type Device = Database['public']['Tables']['devices']['Row']
export type Drone = Database['public']['Tables']['drones']['Row']

export interface WebSocketMessage<T = any> {
  type: SecureMessageType
  data: T
  deviceId?: string
  droneId?: string
  timestamp: number
  authenticated: boolean
  requestId?: string
  validatedAuth?: ValidatedAuth
}

export interface AuthenticationMessage {
  type: 'authentication'
  data: {
    accessToken: string
    userId: string
  }
}

export interface DeviceTelemetry {
  temperature: number
  humidity: number
  pressure: number
  status: Device['status']
  batteryLevel: number
}

export interface DroneTelemetry {
  altitude: number
  speed: number
  heading: number
  status: Drone['status']
  batteryLevel: number
  location: {
    lat: number
    lng: number
  }
}

export interface SessionData {
  accessToken: string
  userId: string
  expiresAt: number
}

export interface ErrorMessage {
  type: 'error'
  data: {
    code: 'AUTH_REQUIRED' | 'AUTH_INVALID' | 'SESSION_EXPIRED' | 'INVALID_MESSAGE'
    message: string
  }
}

export interface ServerResponse {
  type: 'response'
  status: 'success' | 'error'
  requestId?: string
  data: any
}

export interface SupabaseAuth {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: {
    id: string
    email?: string
  }
}

export interface ValidatedAuth extends SupabaseAuth {
  serverValidated: boolean
  serverValidationTimestamp: number
  validationSource: 'getUser' | 'getSession'
}

export interface SecureAuthMessage {
  type: 'auth_validation'
  data: {
    validation: {
      method: 'getUser'
      timestamp: number
      token: string
    }
    serverResponse?: {
      validated: boolean
      timestamp: number
      user: {
        id: string
        email?: string
      }
    }
  }
}

export interface AuthenticatedMessage extends WebSocketMessage<any> {
  auth: ValidatedAuth
}

export type MessageType = 
  | 'telemetry' 
  | 'status' 
  | 'location' 
  | 'authentication' 
  | 'error' 
  | 'response'
  | 'auth_refresh'
  | 'auth_validate'

export type SecureMessageType = MessageType | 'auth_validation' | 'auth_server_response'

export interface CustomWebSocket extends WebSocket {
  userId?: string
  isAlive?: boolean
  readyState: 0 | 1 | 2 | 3
  authenticated: boolean
  session?: SessionData
  lastAuthCheck: number
  authRetries: number
  send(data: string): void
  onmessage: ((event: MessageEvent) => void) | null
  onclose: ((event: CloseEvent) => void) | null
  supabaseAuth?: SupabaseAuth
  validateAuth: () => Promise<boolean>
  refreshAuth: () => Promise<void>
  authState: AuthState
  rateLimit: {
    authChecks: number
    lastCheck: number
    maxChecks: number
    resetTime: number
  }
  validateWithServer: () => Promise<ValidatedAuth>
  requireServerValidation: boolean
  validationTimeout: number
}

export interface AuthValidation {
  validated: boolean
  timestamp: number
  attempts: number
  maxAttempts: number
}

export interface AuthState {
  isAuthenticated: boolean
  lastValidated: number
  validation: AuthValidation
  refreshToken: string
  tokenExpiry: number
  validatedAuth?: ValidatedAuth
  pendingValidation: boolean
  lastServerValidation: number
  requiresRevalidation: boolean
}

export type SecureWebSocketMessage<T = any> = WebSocketMessage<T> & {
  authToken: string
  validationHash: string
}