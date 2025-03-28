"use client"

import { useState } from "react"
import { Terminal, Database, Code, Server, BookOpen, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TechConsolePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tech Console</h1>
        
        <div className="space-y-6">
          {/* Database Management */}
          <Link href="/leader-dashboard/tech-console/database">
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Database size={20} />
                <span>Database Management</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          {/* Seed Educational Content */}
          <Link href="/leader-dashboard/tech-console/seed-content">
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <BookOpen size={20} />
                <span>Seed Educational Content</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          {/* Verify System Status */}
          <Link href="/leader-dashboard/tech-console/verify">
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} />
                <span>Verify System Status</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 