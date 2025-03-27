"use client"

import { Users, UserPlus, Mail, Clock } from "lucide-react"
import Link from "next/link"

export default function MembersPage() {
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
        <h1 className="text-3xl font-bold mb-6">Members</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Total Members" 
            value="1,234" 
            trend="+12%" 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="New This Month" 
            value="45" 
            trend="+8%" 
            icon={<UserPlus size={24} />} 
          />
          <StatCard 
            title="Active Members" 
            value="876" 
            trend="+15%" 
            icon={<Users size={24} />} 
          />
        </div>

        {/* Recent Members */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Members</h2>
          <div className="space-y-4">
            {[
              { name: 'Alex Thompson', email: 'alex@example.com', joined: '2 hours ago' },
              { name: 'Sarah Wilson', email: 'sarah@example.com', joined: '5 hours ago' },
              { name: 'Michael Chen', email: 'michael@example.com', joined: '1 day ago' }
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span className="text-sm">{member.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className="flex items-center text-green-400">
          <span>{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 