"use client"

import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"

// Create placeholder components until we implement them
const DeviceGrid = () => (
  <div className="p-4">Device Grid Component (Coming Soon)</div>
)

const DeviceMap = () => (
  <div className="p-4">Device Map Component (Coming Soon)</div>
)

const DeviceFilters = () => (
  <div className="flex gap-4 mb-4">
    <input type="text" placeholder="Search devices..." className="rounded-md border px-3 py-2" />
    <select className="rounded-md border px-3 py-2">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="idle">Idle</option>
      <option value="offline">Offline</option>
    </select>
  </div>
)

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Device Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Device
        </Button>
      </div>

      <DeviceFilters />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Device Location</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <DeviceMap />
            </Suspense>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Device Status</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <DeviceGrid />
            </Suspense>
          </div>
        </Card>
      </div>
    </div>
  )
}

