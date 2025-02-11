"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function LoginPage() {
  const router = useRouter()

  const onLoginSuccess = () => {
    console.log("Redirecting to app dashboard...")
    router.replace("/app")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <LoginForm onSuccess={onLoginSuccess} />
        </div>
      </main>
    </div>
  )
}