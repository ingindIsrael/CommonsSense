"use client"

import { useState } from "react"
import { Terminal, Database, Code, Server, BookOpen } from "lucide-react"
import Link from "next/link"

export default function TechConsolePage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Main Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tech Console</h1>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="text-red-500" size={24} />
            <h2 className="text-xl font-bold">System Controls</h2>
          </div>
          
          <div className="space-y-4">
            <Link href="/leader-dashboard/tech-console/database">
              <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Database size={20} />
                  <span>Database Management</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
            
            <Link href="/leader-dashboard/tech-console/seed-content">
              <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <BookOpen size={20} />
                  <span>Seed Educational Content</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </Link>
            
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Code size={20} />
                <span>API Configuration</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Server size={20} />
                <span>System Logs</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 