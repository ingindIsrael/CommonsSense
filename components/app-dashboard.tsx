"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Database,
  LogOut,
  ShoppingBag,
  Flag,
  Settings,
  HelpCircle,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode } from "react"

interface AppTile {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  url: string
  color: string
}

interface User {
  email?: string
  user_metadata?: {
    username?: string
  }
}

interface DashboardTile {
  title: string
  description: string
  icon: ReactNode
  href: string
  color: string
  requiresSecurityCheck?: boolean
}

interface AppDashboardProps {
  tiles: DashboardTile[]
}

export function AppDashboard({ tiles }: AppDashboardProps) {
  const [supabase, setSupabase] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialize Supabase in useEffect
  useEffect(() => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      
      if (supabaseUrl && supabaseAnonKey) {
        const client = createClient(supabaseUrl, supabaseAnonKey)
        setSupabase(client)
      }
    } catch (error) {
      console.warn("Supabase client initialization failed:", error)
    }
  }, [])

  // Sample app tiles - you can customize these or load from your database
  const appTiles: AppTile[] = [
    {
      id: "leader-dashboard",
      name: "Leader Dashboard",
      description: "Access your leadership overview and metrics",
      icon: <Home size={24} />,
      url: "/leader-dashboard",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Manage events and schedules",
      icon: <Calendar size={24} />,
      url: "/calendar",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "polied",
      name: "PoliEd",
      description: "Political education resources and training",
      icon: <FileText size={24} />,
      url: "/polied",
      color: "from-green-500 to-green-600"
    },
    {
      id: "social",
      name: "Social",
      description: "Connect with your community",
      icon: <Users size={24} />,
      url: "/social",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "financial",
      name: "Financial",
      description: "Manage budgets and transactions",
      icon: <Database size={24} />,
      url: "/financial",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "resources",
      name: "Resources",
      description: "Access shared resources and documents",
      icon: <FileText size={24} />,
      url: "/resources",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "swag-shop",
      name: "Swag Shop",
      description: "Browse and order merchandise",
      icon: <ShoppingBag size={24} />,
      url: "/swag-shop",
      color: "from-red-500 to-red-600"
    },
    {
      id: "campaigns",
      name: "Campaigns",
      description: "Manage your active campaigns",
      icon: <Flag size={24} />,
      url: "/campaigns",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const supabaseAvailable = supabase !== null

  useEffect(() => {
    // Check for user session on component mount
    const checkUser = async () => {
      if (supabaseAvailable) {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          setUser(session?.user || { email: "demo@example.com" })
          
          if (!session?.user) {
            router.push("/login")
          }
        } catch (error) {
          console.error("Error checking user session:", error)
          setUser({ email: "demo@example.com" })
        }
      } else {
        console.log("Using demo mode for dashboard")
        setUser({ email: "demo@example.com" })
      }
      
      setLoading(false)
    }
    
    checkUser()
    
    // Set up auth state change listener if Supabase is available
    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} }
    
    if (supabaseAvailable) {
      try {
        const { data } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
          setUser(session?.user || null)
          if (!session?.user) {
            router.push("/login")
          }
        })
        subscription = data.subscription
      } catch (error) {
        console.error("Error setting up auth state change listener:", error)
      }
    }
    
    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase, supabaseAvailable])
  
  const handleSignOut = async () => {
    if (supabaseAvailable) {
      try {
        await supabase.auth.signOut()
      } catch (error) {
        console.error("Error signing out:", error)
      }
    }
    
    router.push("/logout")
  }
  
  const handleTileClick = (e: React.MouseEvent, href: string, requiresSecurityCheck?: boolean) => {
    e.preventDefault()
    if (requiresSecurityCheck) {
      router.push('/leader-dashboard/security-check')
    } else {
      router.push(href)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4 min-h-[80px] flex items-center relative z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/menu" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-14 h-12 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="CommonsSense Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">CommonsSense</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-right mr-2">
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-gray-400">
                {supabaseAvailable ? "Logged in" : "Demo Mode"}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 bg-black/40 hover:bg-black/60 px-4 py-2.5 rounded-lg transition-colors">
                <Settings size={16} />
                <span>Menu</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-xl border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => router.push("/settings")}>
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => window.open('/support', '_blank')}>
                  <HelpCircle size={16} className="mr-2" />
                  Tech Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                  onClick={handleSignOut}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Your Applications</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => (
            <Link 
              key={index}
              href={tile.href}
              onClick={(e) => handleTileClick(e, tile.href, tile.requiresSecurityCheck)}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 cursor-pointer
                        hover:bg-white/20 hover:border-white/30 hover:scale-105 
                        transition-all duration-200
                        flex flex-col items-center text-center overflow-hidden"
            >
              {/* Red accent strip - keeping this red for brand consistency */}
              <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-red-600 to-transparent" />
              
              {/* Icon container with white glow on hover */}
              <div className="relative">
                <div className="bg-white/10 p-4 rounded-full mb-4 
                              group-hover:bg-white/80 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] 
                              transition-all duration-200">
                  <div className="text-white group-hover:text-black transition-colors">
                    {tile.icon}
                  </div>
                </div>
                {/* White glow overlay */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200
                              bg-gradient-to-r from-white/10 via-white/20 to-white/10 
                              blur-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white">{tile.title}</h3>
              <p className="text-gray-300 group-hover:text-white/90">{tile.description}</p>
            </Link>
          ))}
        </div>
      </main>
      
      {!supabaseAvailable && (
        <div className="fixed bottom-4 left-4 right-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 p-3 rounded-lg text-sm">
          <strong>Demo Mode:</strong> Running without Supabase connection. In your actual app, this will connect to your Supabase instance.
        </div>
      )}
    </div>
  )
}

export default AppDashboard 