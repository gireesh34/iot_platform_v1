"use client"

import { SignUpForm } from "@/components/auth/signup-form"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()

  const onSignUpSuccess = () => {
    console.log("Redirecting to login...")
    router.push("/auth/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUpForm onSuccess={onSignUpSuccess} />
    </div>
  )
} 