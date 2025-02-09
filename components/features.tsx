import { Cpu, Shield, Activity, DrillIcon as Drone } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features for IoT Management</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to manage your IoT devices and drones in one platform
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <Cpu className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Device Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Manage all your IoT devices from a single dashboard
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <Drone className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Drone Control</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Advanced drone fleet management and control
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <Activity className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Real-time Monitoring</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Monitor device performance and health in real-time
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Enterprise Security</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Bank-grade security for your IoT infrastructure
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

