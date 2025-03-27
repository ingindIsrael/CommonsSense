"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  BarChart,
  Users,
  Calendar,
  FileText,
  Database,
  ShoppingBag,
  Flag,
  Home,
  ChevronLeft,
  TrendingUp,
  UserPlus,
  Clock,
  DollarSign,
  Download
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AuthTopBar } from "@/components/auth-top-bar"

// Content components for each section
const SectionContent = {
  overview: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Members" 
          value="1,234" 
          trend="+12%" 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Active Campaigns" 
          value="8" 
          trend="+3" 
          icon={<Flag size={24} />} 
        />
        <StatCard 
          title="Monthly Donations" 
          value="$12,345" 
          trend="+23%" 
          icon={<DollarSign size={24} />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityCard />
        <UpcomingEventsCard />
      </div>
    </div>
  ),

  members: () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Member Management</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
            <div>
              <p className="font-medium">Active Members</p>
              <p className="text-2xl font-bold">876</p>
            </div>
            <UserPlus className="text-gray-400" size={24} />
          </div>
          {/* Add more member stats and management tools */}
        </div>
      </div>
    </div>
  ),

  events: () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
              <Calendar className="text-red-400" size={24} />
              <div>
                <p className="font-medium">Event Title {i}</p>
                <p className="text-sm text-gray-400">Date • Location</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  education: () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Political Education Resources</h3>
        <div className="grid gap-4">
          {['Training Materials', 'Workshops', 'Documents'].map((category) => (
            <div key={category} className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">{category}</p>
                <FileText className="text-gray-400" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  finances: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Revenue" 
          value="$45,678" 
          trend="+8%" 
          icon={<DollarSign size={24} />} 
        />
        <StatCard 
          title="Monthly Expenses" 
          value="$12,345" 
          trend="-2%" 
          icon={<Database size={24} />} 
        />
        <StatCard 
          title="Available Budget" 
          value="$33,333" 
          trend="+15%" 
          icon={<DollarSign size={24} />} 
        />
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { type: 'Donation', amount: '+$500', from: 'Anonymous Donor', date: 'Today' },
            { type: 'Expense', amount: '-$250', from: 'Event Supplies', date: 'Yesterday' },
            { type: 'Merchandise', amount: '+$750', from: 'T-shirt Sales', date: '2 days ago' }
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  transaction.amount.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <DollarSign size={16} />
                </div>
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-400">{transaction.from}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>{transaction.amount}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  merchandise: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'T-Shirts', stock: '124 units', sales: '45 this month' },
          { name: 'Hoodies', stock: '89 units', sales: '32 this month' },
          { name: 'Stickers', stock: '500 units', sales: '150 this month' },
          { name: 'Mugs', stock: '75 units', sales: '28 this month' },
          { name: 'Pins', stock: '250 units', sales: '85 this month' },
          { name: 'Posters', stock: '150 units', sales: '42 this month' }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <ShoppingBag size={20} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-400">In Stock: {item.stock}</p>
            <p className="text-green-400 text-sm mt-2">{item.sales}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  campaigns: () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Active Campaigns</h3>
        <div className="space-y-4">
          {[
            { name: 'Summer Outreach', progress: 75, target: '$10,000', raised: '$7,500' },
            { name: 'Community Workshop', progress: 45, target: '$5,000', raised: '$2,250' },
            { name: 'Youth Program', progress: 90, target: '$15,000', raised: '$13,500' }
          ].map((campaign, i) => (
            <div key={i} className="p-4 bg-black/30 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-gray-400">Target: {campaign.target}</p>
                </div>
                <span className="text-green-400">{campaign.raised}</span>
              </div>
              <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">{campaign.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  analytics: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Page Views" 
          value="12.5K" 
          trend="+24%" 
          icon={<BarChart size={24} />} 
        />
        <StatCard 
          title="New Members" 
          value="234" 
          trend="+12%" 
          icon={<UserPlus size={24} />} 
        />
        <StatCard 
          title="Engagement" 
          value="67%" 
          trend="+5%" 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Conversion" 
          value="8.9%" 
          trend="+2%" 
          icon={<TrendingUp size={24} />} 
        />
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Growth Metrics</h3>
        <div className="space-y-4">
          {[
            { metric: 'Member Growth', current: '+12%', previous: '+8%' },
            { metric: 'Donation Growth', current: '+23%', previous: '+15%' },
            { metric: 'Event Attendance', current: '+45%', previous: '+30%' },
            { metric: 'Social Engagement', current: '+67%', previous: '+40%' }
          ].map((metric, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <p className="font-medium">{metric.metric}</p>
              <div className="flex items-center gap-4">
                <span className="text-green-400">{metric.current}</span>
                <span className="text-sm text-gray-400">prev: {metric.previous}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper components
function StatCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className="flex items-center text-green-400">
          <TrendingUp size={16} className="mr-1" />
          {trend}
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
}

function ActivityCard() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Clock size={16} />
            </div>
            <div>
              <p className="font-medium">Activity {i}</p>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UpcomingEventsCard() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Calendar size={16} />
            </div>
            <div>
              <p className="font-medium">Event {i}</p>
              <p className="text-sm text-gray-400">Next Week</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function fetchSchema() {
  const response = await fetch('/api/schema', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch schema')
  }

  return response.json()
}

export default function LeaderDashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const router = useRouter()

  return (
    <div className="flex-1 overflow-auto">
      {/* Top Bar */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Main Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">{activeSection}</h1>
        {SectionContent[activeSection]?.()}
      </div>
    </div>
  )
} 