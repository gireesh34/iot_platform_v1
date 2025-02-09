"use client"

import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/auth/login")
    }
  }, [router])

  if (!isAuthenticated()) {
    return null // Prevent flash of content
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}

