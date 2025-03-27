"use client"

import { Flag, Users, Target, TrendingUp, Calendar, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
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
        <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Active Campaigns" 
            value="8" 
            trend="+2" 
            icon={<Flag size={24} />} 
          />
          <StatCard 
            title="Total Volunteers" 
            value="245" 
            trend="+12%" 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="Goals Achieved" 
            value="85%" 
            trend="+5%" 
            icon={<Target size={24} />} 
          />
        </div>

        {/* Active Campaigns */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Active Campaigns</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Community Outreach 2024',
                status: 'In Progress',
                progress: 75,
                volunteers: 45,
                endDate: 'Aug 15, 2024',
                location: 'Downtown Area'
              },
              {
                name: 'Youth Engagement Initiative',
                status: 'Starting Soon',
                progress: 0,
                volunteers: 30,
                endDate: 'Sep 1, 2024',
                location: 'Multiple Locations'
              },
              {
                name: 'Environmental Action',
                status: 'In Progress',
                progress: 45,
                volunteers: 60,
                endDate: 'Oct 30, 2024',
                location: 'City-wide'
              }
            ].map((campaign, i) => (
              <div key={i} className="p-4 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-full">
                      <Flag size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Calendar size={14} />
                          <span>Until {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <MapPin size={14} />
                          <span>{campaign.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1">
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{campaign.progress}%</span>
                  <div className="flex items-center gap-1 text-gray-400 ml-4">
                    <Users size={16} />
                    <span className="text-sm">{campaign.volunteers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Campaigns */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Completed Campaigns</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Spring Membership Drive',
                volunteers: 85,
                endDate: 'May 30, 2024',
                impact: '250+ new members'
              },
              {
                name: 'Local Policy Initiative',
                volunteers: 120,
                endDate: 'Apr 15, 2024',
                impact: '3 policies changed'
              }
            ].map((campaign, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Target size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-gray-400">Completed on {campaign.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="text-sm">{campaign.impact}</span>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span className="text-sm">{campaign.volunteers}</span>
                  </div>
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
          <TrendingUp size={16} className="mr-1" />
          <span>{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 