"use client"

import { BarChart as BarChartIcon, TrendingUp, Users, Target, Activity, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
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
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Total Members" 
            value="1,234" 
            trend="+12%" 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="Engagement Rate" 
            value="67%" 
            trend="+5%" 
            icon={<Activity size={24} />} 
          />
          <StatCard 
            title="Goals Met" 
            value="85%" 
            trend="+15%" 
            icon={<Target size={24} />} 
          />
        </div>

        {/* Growth Metrics */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Growth Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'New Members',
                value: '+126',
                change: '+12.5%',
                trend: 'up'
              },
              {
                label: 'Event Attendance',
                value: '89%',
                change: '+4.2%',
                trend: 'up'
              },
              {
                label: 'Campaign Success',
                value: '92%',
                change: '-2.1%',
                trend: 'down'
              },
              {
                label: 'Volunteer Hours',
                value: '1,890',
                change: '+23.4%',
                trend: 'up'
              }
            ].map((metric, i) => (
              <div key={i} className="p-4 bg-black/30 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <div className={`flex items-center ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? 
                      <ArrowUp size={16} className="mr-1" /> : 
                      <ArrowDown size={16} className="mr-1" />
                    }
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
          <div className="space-y-6">
            {[
              {
                category: 'Members',
                events: [
                  {
                    title: 'Membership Growth',
                    metric: '126 new members',
                    time: 'This month',
                    trend: '+12.5% from last month'
                  },
                  {
                    title: 'Active Participation',
                    metric: '67% engagement rate',
                    time: 'Last 30 days',
                    trend: '+5.2% from previous period'
                  }
                ]
              },
              {
                category: 'Events',
                events: [
                  {
                    title: 'Event Attendance',
                    metric: '89% average attendance',
                    time: 'Last 5 events',
                    trend: '+4.2% improvement'
                  },
                  {
                    title: 'Upcoming Events',
                    metric: '8 events scheduled',
                    time: 'Next 30 days',
                    trend: '3 more than last month'
                  }
                ]
              },
              {
                category: 'Campaigns',
                events: [
                  {
                    title: 'Campaign Performance',
                    metric: '92% success rate',
                    time: 'Current quarter',
                    trend: '-2.1% from last quarter'
                  },
                  {
                    title: 'Volunteer Engagement',
                    metric: '1,890 hours contributed',
                    time: 'This month',
                    trend: '+23.4% increase'
                  }
                ]
              }
            ].map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-gray-400 mb-3">{section.category}</h3>
                <div className="space-y-4">
                  {section.events.map((event, j) => (
                    <div key={j} className="p-4 bg-black/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-xl font-bold">{event.metric}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{event.time}</span>
                        <span>{event.trend}</span>
                      </div>
                    </div>
                  ))}
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