"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { 
  Home, 
  Settings, 
  FileText, 
  Users, 
  Calendar, 
  Mail, 
  Shield, 
  Database,
  LogOut
} from "lucide-react"

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

export function AppDashboard() {
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
      id: "home",
      name: "Home",
      description: "Return to the main dashboard",
      icon: <Home size={24} />,
      url: "/dashboard",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "documents",
      name: "Documents",
      description: "Access and manage your documents",
      icon: <FileText size={24} />,
      url: "/documents",
      color: "from-green-500 to-green-600"
    },
    {
      id: "users",
      name: "Users",
      description: "Manage user accounts and permissions",
      icon: <Users size={24} />,
      url: "/users",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "View and manage your schedule",
      icon: <Calendar size={24} />,
      url: "/calendar",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "messages",
      name: "Messages",
      description: "View and send messages",
      icon: <Mail size={24} />,
      url: "/messages",
      color: "from-red-500 to-red-600"
    },
    {
      id: "security",
      name: "Security",
      description: "Manage security settings",
      icon: <Shield size={24} />,
      url: "/security",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "database",
      name: "Database",
      description: "Access database management tools",
      icon: <Database size={24} />,
      url: "/database",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "settings",
      name: "Settings",
      description: "Configure application settings",
      icon: <Settings size={24} />,
      url: "/settings",
      color: "from-gray-500 to-gray-600"
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
  
  const handleTileClick = (url: string) => {
    router.push(url)
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
          <h1 className="text-2xl font-bold">App Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-gray-400">
                {supabaseAvailable ? "Logged in" : "Demo Mode"}
              </p>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2.5 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Your Applications</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {appTiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile.url)}
              className={`bg-gradient-to-br ${tile.color} bg-opacity-20 backdrop-blur-lg 
                         border border-white/10 rounded-xl p-6 cursor-pointer
                         hover:scale-105 transition-transform duration-200
                         flex flex-col items-center text-center`}
            >
              <div className="bg-white/10 p-4 rounded-full mb-4">
                {tile.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{tile.name}</h3>
              <p className="text-sm text-gray-300">{tile.description}</p>
            </div>
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