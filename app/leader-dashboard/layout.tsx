"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { 
  Home, 
  Users, 
  Calendar, 
  FileText,
  ShoppingBag,
  Flag,
  BarChart,
  ChevronLeft,
  Terminal
} from "lucide-react"

export default function LeaderDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Don't show sidebar on security check page
  if (pathname === '/leader-dashboard/security-check') {
    return children
  }

  const navigationItems = [
    { href: "/leader-dashboard/overview", icon: <Home size={20} />, label: "Overview" },
    { href: "/leader-dashboard/members", icon: <Users size={20} />, label: "Members" },
    { href: "/leader-dashboard/events", icon: <Calendar size={20} />, label: "Events" },
    { href: "/leader-dashboard/education", icon: <FileText size={20} />, label: "Political Education" },
    { href: "/leader-dashboard/finances", icon: <ShoppingBag size={20} />, label: "Finances" },
    { href: "/leader-dashboard/merchandise", icon: <ShoppingBag size={20} />, label: "Merchandise" },
    { href: "/leader-dashboard/campaigns", icon: <Flag size={20} />, label: "Campaigns" },
    { href: "/leader-dashboard/analytics", icon: <BarChart size={20} />, label: "Analytics" },
    { href: "/leader-dashboard/tech-console/verify", icon: <Terminal size={20} />, label: "Tech Console" }
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold">Leader Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${pathname === item.href 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black">
        {children}
      </div>
    </div>
  )
} 