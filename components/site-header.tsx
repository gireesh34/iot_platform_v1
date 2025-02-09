"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace("/auth/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center space-x-4">
          <Link href="/app" className="font-medium">
            Dashboard
          </Link>
          <Link href="/app/drones" className="font-medium">
            Drones
          </Link>
          <Link href="/app/devices" className="font-medium">
            Devices
          </Link>
          <Link href="/app/analytics" className="font-medium">
            Analytics
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
} 