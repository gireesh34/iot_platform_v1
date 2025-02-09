import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export function DeviceFilters() {
  return (
    <div className="flex gap-4">
      <Input 
        type="text" 
        placeholder="Search devices..." 
        className="max-w-xs" 
      />
      <Select>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="idle">Idle</option>
        <option value="offline">Offline</option>
      </Select>
    </div>
  )
} 