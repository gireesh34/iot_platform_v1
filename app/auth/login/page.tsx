"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const onLoginSuccess = () => {
    console.log("Redirecting to app dashboard...")
    router.replace("/app")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm onSuccess={onLoginSuccess} />
    </div>
  )
} 