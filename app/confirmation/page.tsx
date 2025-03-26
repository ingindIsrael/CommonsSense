"use client"

import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/top-bar"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function ConfirmationPage() {
  const router = useRouter()
  const [isDevelopment, setIsDevelopment] = useState(false)

  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === 'development')
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <TopBar />
      <div className="flex-grow flex items-center justify-center pt-16">
        <div className="text-center max-w-md w-full mx-auto p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Check Your Email</h1>
          <p className="text-gray-300 mb-8">
            We're creating your account! To finish the process, please confirm your account using the link we just sent to your email.
          </p>
          <div className="space-y-4">
            {isDevelopment && (
              <div className="mb-8 p-4 bg-black/50 rounded-lg text-sm">
                <p className="text-yellow-400 mb-2">Development Mode</p>
                <p className="text-gray-300 mb-2">
                  You can view the confirmation email at:
                </p>
                <a 
                  href="http://localhost:54324" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  localhost:54324
                </a>
              </div>
            )}
            <Button 
              onClick={() => router.push("/")}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Return to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 