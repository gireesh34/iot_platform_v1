"use client"

import { SignUpForm } from "@/components/auth/signup-form"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function SignUpPage() {
  const router = useRouter()

  const onSignUpSuccess = () => {
    console.log("Redirecting to login...")
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <SignUpForm onSuccess={onSignUpSuccess} />
        </div>
      </main>
    </div>
  )
}