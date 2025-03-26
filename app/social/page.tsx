"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Construction } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SocialPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-8 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="CommonsSense Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-sm font-bold tracking-tight">Social</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Coming Soon Content */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-73px)] p-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-12 text-center max-w-2xl">
            <div className="flex justify-center mb-6">
              <Construction size={64} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
            <p className="text-gray-400 text-lg mb-6">
              We're working hard to build an amazing social experience for our community. 
              This feature will be available soon!
            </p>
            <div className="text-sm text-gray-500">
              Expected Release: Q1 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 