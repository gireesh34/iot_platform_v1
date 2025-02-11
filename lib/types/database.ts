export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string
          user_id: string
          name: string
          status: string
          metadata: Json | null
          last_seen: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: string
          metadata?: Json | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: string
          metadata?: Json | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      drones: {
        Row: {
          id: string
          user_id: string
          name: string
          status: string
          metadata: Json | null
          last_location: Json | null
          last_seen: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: string
          metadata?: Json | null
          last_location?: Json | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: string
          metadata?: Json | null
          last_location?: Json | null
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      telemetry: {
        Row: {
          id: string
          device_id: string | null
          drone_id: string | null
          data: Json
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          device_id?: string | null
          drone_id?: string | null
          data: Json
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string | null
          drone_id?: string | null
          data?: Json
          timestamp?: string
          created_at?: string
        }
      }
    }
  }
}