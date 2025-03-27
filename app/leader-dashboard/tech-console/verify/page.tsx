"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Terminal } from "lucide-react"
import { WarningModal } from "../components/warning-modal"

export default function TechConsoleVerifyPage() {
  const [securityCode, setSecurityCode] = useState("")
  const [error, setError] = useState("")
  const [showWarning, setShowWarning] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (securityCode.trim()) {
      setShowWarning(true)
    } else {
      setError("Please enter a security code")
    }
  }

  const handleWarningConfirm = () => {
    router.push("/leader-dashboard/tech-console")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-500/10 rounded-full">
            <Terminal size={32} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Tech Console Access</h1>
        <p className="text-gray-400 text-center mb-8">
          Please enter your tech specialist security code to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="number"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Enter tech security code"
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
            href="/leader-dashboard/overview"
            className="block text-center text-gray-400 hover:text-white transition-colors"
          >
            Back to Dashboard
          </Link>
        </form>
      </div>

      <WarningModal 
        isOpen={showWarning} 
        onConfirm={handleWarningConfirm}
      />
    </div>
  )
} 