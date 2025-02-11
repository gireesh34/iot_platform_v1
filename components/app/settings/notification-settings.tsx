"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how and when you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Notifications</Label>
            <Switch id="email" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push">Push Notifications</Label>
            <Switch id="push" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms">SMS Notifications</Label>
            <Switch id="sms" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Alert Priority Level</Label>
            <Select defaultValue="high">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="high">High Priority Only</SelectItem>
                <SelectItem value="medium">Medium and High</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Notification Time</Label>
            <Select defaultValue="always">
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always</SelectItem>
                <SelectItem value="working">Working Hours (9-5)</SelectItem>
                <SelectItem value="custom">Custom Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
export default NotificationSettings;
