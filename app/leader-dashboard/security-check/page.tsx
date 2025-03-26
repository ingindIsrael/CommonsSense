"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SecurityCheckPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      // For now, accept any number
      router.push("/leader-dashboard/overview")
    } else {
      setError("Please enter a security code")
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md w-full mx-auto p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Security Check</h1>
          <p className="text-gray-300 mb-8">
            Please enter your leadership security code to continue
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="number"
                placeholder="Enter security code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
            </div>
            <Button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Verify & Continue
            </Button>
            <Button 
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-full bg-black hover:bg-black/70 text-white border border-white/10 mt-4"
            >
              Back to Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 