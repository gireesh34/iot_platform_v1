"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Key, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "sk_prod_***********************",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "sk_dev_***********************",
    created: "2024-01-20",
    lastUsed: "5 minutes ago",
  },
]

export function ApiKeys() {
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    })
  }

  const handleDelete = (id: number) => {
    // TODO: Implement API key deletion
    toast({
      title: "Deleted",
      description: "API key has been revoked",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Manage your API keys for accessing the platform programmatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button className="w-full">
          <Key className="mr-2 h-4 w-4" />
          Generate New API Key
        </Button>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{apiKey.name}</p>
                <p className="text-sm text-muted-foreground">{apiKey.key}</p>
                <p className="text-xs text-muted-foreground">
                  Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleCopy(apiKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDelete(apiKey.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 