import { Suspense } from "react"
import { SecuritySettings } from "@/components/app/settings/security-settings"
import { ApiKeys } from "@/components/app/settings/api-keys"
import { NotificationSettings } from "@/components/app/settings/notification-settings"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="security">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <Suspense fallback={<LoadingSpinner />}>
            <SecuritySettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="api">
          <Suspense fallback={<LoadingSpinner />}>
            <ApiKeys />
          </Suspense>
        </TabsContent>

        <TabsContent value="notifications">
          <Suspense fallback={<LoadingSpinner />}>
            <NotificationSettings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

