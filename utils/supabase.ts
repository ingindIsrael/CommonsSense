import { createClient } from "@supabase/supabase-js"

// Function to safely create a Supabase client
const createSafeClient = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    // Server-side: require environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase environment variables are missing on the server")
      return null
    }
  }

  // Get environment variables with fallbacks for development
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return null
  }
}

// Create and export the client
export const supabase = createSafeClient()

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

