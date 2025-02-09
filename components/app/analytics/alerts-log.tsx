import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

const alerts = [
  { id: 1, title: "Low Battery", description: "Drone 3 battery level is below 20%" },
  { id: 2, title: "Mission Completed", description: "Mission 'City Survey' has been completed" },
  { id: 3, title: "Weather Alert", description: "High winds detected in the operation area" },
]

export function AlertsLog() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4 pr-4">
        {alerts.map((alert) => (
          <Alert key={alert.id}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </ScrollArea>
  )
}

