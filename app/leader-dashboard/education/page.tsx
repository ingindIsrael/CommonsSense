"use client"

import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Top Navigation */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                ← Back to Main Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Political Education</h1>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Educational Resources</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <span>Training Materials</span>
              <span className="text-gray-400">→</span>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <span>Workshops</span>
              <span className="text-gray-400">→</span>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <span>Documents</span>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 