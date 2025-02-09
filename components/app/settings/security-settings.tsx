"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and authentication preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Two-Factor Authentication</Label>
            <Switch id="2fa" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="session">Automatic Session Timeout</Label>
            <Switch id="session" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Security Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            View Security Log
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 