"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  FileText,
  ChevronLeft,
  Plus,
  Book,
  Video,
  File,
  Download,
  Clock,
  Users,
  Folder,
  Search
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock resources data
const resources = [
  {
    id: 1,
    title: 'New Member Onboarding Guide',
    type: 'document',
    category: 'Training',
    size: '2.4 MB',
    lastUpdated: '2024-03-26',
    downloads: 145
  },
  {
    id: 2,
    title: 'Leadership Training Video',
    type: 'video',
    category: 'Training',
    size: '156 MB',
    lastUpdated: '2024-03-25',
    downloads: 89
  },
  {
    id: 3,
    title: 'Community Guidelines',
    type: 'document',
    category: 'Policies',
    size: '1.2 MB',
    lastUpdated: '2024-03-24',
    downloads: 234
  }
]

const categories = [
  { id: 'training', name: 'Training Materials', icon: <Book size={20} />, color: 'bg-blue-500' },
  { id: 'videos', name: 'Video Resources', icon: <Video size={20} />, color: 'bg-green-500' },
  { id: 'documents', name: 'Documents', icon: <FileText size={20} />, color: 'bg-purple-500' },
  { id: 'policies', name: 'Policies', icon: <File size={20} />, color: 'bg-red-500' },
]

export default function ResourcesPage() {
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
            <span className="text-sm font-bold tracking-tight">Resources</span>
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6">
          {/* Upload Button */}
          <button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={20} />
            <span>Upload Resource</span>
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
                  <span className={`p-2 rounded-lg ${category.color}/20`}>
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Downloads */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">RECENT DOWNLOADS</h3>
            <div className="space-y-3">
              {resources.slice(0, 3).map((resource) => (
                <div key={resource.id} className="bg-white/5 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium truncate">{resource.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{resource.category}</span>
                    <span>{resource.lastUpdated}</span>
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
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Resource Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Resources"
              value="234"
              icon={<Folder size={24} />}
              detail="12 categories"
            />
            <StatCard 
              title="Total Downloads"
              value="1,234"
              icon={<Download size={24} />}
              detail="Last 30 days"
            />
            <StatCard 
              title="Active Users"
              value="89"
              icon={<Users size={24} />}
              detail="Currently accessing"
            />
          </div>

          {/* Resource List */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">All Resources</h3>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      {resource.type === 'video' ? <Video size={24} /> : <FileText size={24} />}
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-400">{resource.category}</span>
                        <span className="text-sm text-gray-400">{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Download size={14} />
                        <span className="text-sm">{resource.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                        <Clock size={14} />
                        <span>{resource.lastUpdated}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Download size={20} />
                    </button>
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
  detail: string
}

function StatCard({ title, value, icon, detail }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{detail}</p>
    </div>
  )
} 