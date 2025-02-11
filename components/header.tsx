"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { DrillIcon as Drone } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { useEffect, useState } from "react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Drone className="h-6 w-6" />
            <span className="inline-block font-bold">IoT Platform</span>
          </Link>
          
          {user ? (
            // Authenticated navigation
            <nav className="hidden md:flex gap-6">
              <Link href="/app" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link href="/app/drones" className="text-sm font-medium transition-colors hover:text-primary">
                Drones
              </Link>
              <Link href="/app/devices" className="text-sm font-medium transition-colors hover:text-primary">
                Devices
              </Link>
              <Link href="/app/analytics" className="text-sm font-medium transition-colors hover:text-primary">
                Analytics
              </Link>
              <Link href="/app/settings" className="text-sm font-medium transition-colors hover:text-primary">
                Settings
              </Link>
            </nav>
          ) : (
            // Public navigation
            <nav className="hidden md:flex gap-6">
              <Link href="/#features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <Button
              variant="ghost"
              className="text-red-600 hover:text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
