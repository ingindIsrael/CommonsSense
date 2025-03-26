"use client"

import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/top-bar"
import { useRouter } from "next/navigation"

export default function MenuPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <TopBar />
      <div className="flex-grow flex items-center justify-center pt-16">
        <div className="text-center max-w-md w-full mx-auto p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold mb-8">Where Would You Like to Go?</h1>
          <div className="space-y-4">
            <Button 
              onClick={() => router.push("/logout")}
              className="w-full bg-red-600 hover:bg-red-700 text-white mb-4"
            >
              Want to Logout?
            </Button>
            <Button 
              onClick={() => router.push("/dashboard")}
              className="w-full bg-black hover:bg-black/70 text-white border border-white/10"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 