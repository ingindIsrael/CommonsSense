"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/top-bar"

export function LogoutClient() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <TopBar />
      <div className="flex-grow flex items-center justify-center pt-16">
        <div className="text-center max-w-md w-full mx-auto p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
          <h1 className="text-3xl font-bold mb-4">You've been logged out</h1>
          <p className="text-gray-400 mb-8">Thank you for using our application</p>
          <Button 
            onClick={() => router.push("/")}
            className="bg-red-600 hover:bg-red-700 text-white w-full"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  )
} 