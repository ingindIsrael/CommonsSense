"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SecurityCheckPage() {
  const [securityCode, setSecurityCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (securityCode.trim()) {
      // Accept any non-empty number
      router.push("/leader-dashboard/overview")
    } else {
      setError("Please enter a security code")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Security Check</h1>
        <p className="text-gray-400 text-center mb-8">
          Please enter your leadership security code to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="number"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Enter security code"
              className="w-full p-4 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500"
            />
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg transition-colors"
          >
            Verify & Continue
          </button>

          <Link 
            href="/dashboard"
            className="block text-center text-gray-400 hover:text-white transition-colors"
          >
            Back to Dashboard
          </Link>
        </form>
      </div>
    </div>
  )
} 