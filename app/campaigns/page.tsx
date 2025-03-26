"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Flag,
  ChevronLeft,
  Plus,
  Users,
  Target,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  BarChart,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock campaigns data
const campaigns = [
  {
    id: 1,
    title: 'Summer Outreach Program',
    status: 'active',
    target: 10000,
    raised: 7500,
    supporters: 145,
    endDate: '2024-06-30',
    category: 'Community',
    progress: 75
  },
  {
    id: 2,
    title: 'Youth Leadership Workshop',
    status: 'active',
    target: 5000,
    raised: 3750,
    supporters: 89,
    endDate: '2024-05-15',
    category: 'Education',
    progress: 65
  },
  {
    id: 3,
    title: 'Environmental Initiative',
    status: 'planning',
    target: 15000,
    raised: 0,
    supporters: 0,
    endDate: '2024-07-01',
    category: 'Environment',
    progress: 0
  }
]

const categories = [
  { id: 'community', name: 'Community', color: 'bg-blue-500' },
  { id: 'education', name: 'Education', color: 'bg-green-500' },
  { id: 'environment', name: 'Environment', color: 'bg-purple-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
]

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
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
            <span className="text-sm font-bold tracking-tight">Campaigns</span>
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6">
          {/* Create Campaign Button */}
          <button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={20} />
            <span>Create Campaign</span>
          </button>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">CATEGORIES</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Campaigns */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">ACTIVE CAMPAIGNS</h3>
            <div className="space-y-3">
              {campaigns.filter(c => c.status === 'active').map((campaign) => (
                <div key={campaign.id} className="bg-white/5 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium truncate">{campaign.title}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Active Campaigns"
              value="8"
              icon={<Flag size={24} />}
              trend="+2"
              trendDirection="up"
            />
            <StatCard 
              title="Total Raised"
              value="$45,250"
              icon={<DollarSign size={24} />}
              trend="+12.5%"
              trendDirection="up"
            />
            <StatCard 
              title="Total Supporters"
              value="1,234"
              icon={<Users size={24} />}
              trend="+89"
              trendDirection="up"
            />
            <StatCard 
              title="Success Rate"
              value="85%"
              icon={<Target size={24} />}
              trend="+5%"
              trendDirection="up"
            />
          </div>

          {/* Campaigns List */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">All Campaigns</h3>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      campaign.status === 'active' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {campaign.status === 'active' ? 
                        <CheckCircle2 size={24} className="text-green-500" /> : 
                        <AlertCircle size={24} className="text-yellow-500" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium">{campaign.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-400">{campaign.category}</span>
                        <span className="text-sm text-gray-400">Ends: {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-bold">${campaign.raised.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">of ${campaign.target.toLocaleString()}</p>
                    </div>
                    <div className="w-32">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 transition-all duration-500"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  trendDirection: 'up' | 'down'
}

function StatCard({ title, value, icon, trend, trendDirection }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className={`flex items-center ${
          trendDirection === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          <TrendingUp size={16} className="mr-1" />
          {trend}
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 