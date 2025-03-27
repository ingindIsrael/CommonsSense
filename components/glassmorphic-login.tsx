"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { hashPassword } from "@/utils/password-utils"
import { ToastNotification } from "@/components/ui/toast-notification"

// Try to initialize Supabase client with better error handling
let supabase: any = null
let supabaseError: string | null = null

try {
  const { createClient } = require("@supabase/supabase-js")
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl) {
    supabaseError = "Missing NEXT_PUBLIC_SUPABASE_URL environment variable"
    console.error(supabaseError)
  } else if (!supabaseAnonKey) {
    supabaseError = "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
    console.error(supabaseError)
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log("Supabase client initialized successfully")
  }
} catch (error: any) {
  supabaseError = `Supabase client initialization failed: ${error.message}`
  console.error(supabaseError, error)
}

export function GlassmorphicLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState({ visible: false, message: "" })
  const [connectionStatus, setConnectionStatus] = useState<string>("Checking connection...")
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const supabaseAvailable = typeof supabase !== "undefined" && supabase !== null

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!supabaseAvailable) {
        setConnectionStatus(`Database not available: ${supabaseError || "Unknown error"}`)
        return
      }
      
      try {
        // Simple health check
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`)
        
        if (response.ok) {
          setConnectionStatus("Connected to database")
          console.log("Database connection test successful")
        } else {
          setConnectionStatus("Database connection error")
          console.log("Database connection test failed")
        }
      } catch (err) {
        setConnectionStatus("Database connection error")
        console.log("Database connection test failed")
      }
    }
    
    checkConnection()
  }, [supabaseAvailable])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const username = (e.currentTarget.elements.namedItem("username") as HTMLInputElement)?.value || ""
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value || ""
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value || ""

    console.log(`Attempting to ${isSignUp ? 'sign up' : 'log in'} with email: ${email}`)

    try {
      if (!supabaseAvailable) {
        // Fall back to local authentication if Supabase is not available
        console.log("Using local authentication as fallback")
        
        // Use our secure password hashing for local demo mode
        const { salt, hash } = await hashPassword(password)
        console.log({ username, email, salt, hash: hash.substring(0, 10) + "..." })

        // Simulate successful login for demo purposes
        setTimeout(() => {
          setToast({
            visible: true,
            message: "Local authentication successful!"
          })
          formRef.current?.reset()
          setLoading(false)
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            console.log("Redirecting to dashboard...")
            try {
              router.push("/dashboard")
            } catch (error) {
              console.error("Navigation error:", error)
              // Fallback to window.location if router fails
              window.location.href = "/dashboard"
            }
          }, 1500)
        }, 1000)
        return
      }

      if (isSignUp) {
        console.log("Attempting to sign up with Supabase...")
        
        const salt = btoa(
          String.fromCharCode(...new Uint8Array(window.crypto.getRandomValues(new Uint8Array(16))))
        )
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              salt,
            },
          },
        })

        console.log("Sign up response:", { data, error: signUpError })

        if (signUpError) throw signUpError

        // Redirect to confirmation page instead of showing toast
        router.push("/confirmation")
      } else {
        console.log("Attempting to log in with Supabase...")
        
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          if (signInError.message === "Email not confirmed") {
            // Redirect to a special page for unconfirmed emails
            setError("Please check your email and confirm your account before logging in.")
            
            // Option to resend confirmation email
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email,
            })
            
            if (!resendError) {
              setToast({
                visible: true,
                message: "We've sent another confirmation email. Please check your inbox."
              })
            }
            
            // Redirect to confirmation page
            router.push("/confirmation")
            return
          }
          throw signInError
        }

        // Show success message
        setToast({
          visible: true,
          message: "Successfully logged in!"
        })
        formRef.current?.reset()
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          console.log("Redirecting to dashboard...")
          try {
            router.push("/dashboard")
          } catch (error) {
            console.error("Navigation error:", error)
            // Fallback to window.location if router fails
            window.location.href = "/dashboard"
          }
        }, 1500)
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      setError(error.message || "An error occurred during authentication")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "github" | "google" | "facebook") => {
    if (!supabaseAvailable) {
      setError("Social login is not available without Supabase configuration")
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || `Error signing in with ${provider}`)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-10" />

      {/* Content */}
      <TopBar />

      {/* Main content - with top padding to account for the fixed TopBar */}
      <main className="flex-grow flex flex-row relative z-20 pt-16">
        {/* Left side - Image */}
        <div className="w-1/2 relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-07%2015.23.31%20-%20A%20photorealistic%20version%20of%20the%20'CommonsSense'%20logo%20with%20real%20people,%20but%20without%20any%20text%20and%20featuring%20a%20larger%20crowd.%20The%20image%20should%20have%20a%20signi-9oWIWGWwhHpQuIU6cDYWofqS6y5hOS.webp"
            alt="Community Circle"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </div>

        {/* Right side - Login form with diagonal stripe background */}
        <div
          className="w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, white 0%, white 70%, #dc2626 70%, #dc2626 100%)",
          }}
        >
          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-4 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {isSignUp ? "Sign up to get started" : "Sign in to continue"}
              </p>
            </div>

            {!supabaseAvailable && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-md text-sm">
                Running in local mode. Supabase integration is not available.
              </div>
            )}

            {/* Connection status indicator - temporarily hidden
            <div className={`mb-4 p-3 flex items-center justify-center gap-2 rounded-lg ${
              connectionStatus.startsWith("Connected") 
                ? "bg-green-500/20 border border-green-500/50" 
                : "bg-yellow-500/20 border border-yellow-500/50"
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                connectionStatus.startsWith("Connected")
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`} />
              <span className={`text-sm font-medium ${
                connectionStatus.startsWith("Connected")
                  ? "text-green-700 dark:text-green-300"
                  : "text-yellow-700 dark:text-yellow-300"
              }`}>
                {connectionStatus}
              </span>
            </div>
            */}

            <div className="bg-black/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-300">
              <div className="p-4 sm:p-6 lg:p-8">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                  {isSignUp && (
                    <div>
                      <Label htmlFor="username" className="text-gray-700">
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        autoCapitalize="none"
                        autoCorrect="off"
                        className="bg-white/70 border-gray-300 text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="bg-white/70 border-gray-300 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-white/70 border-gray-300 text-gray-900 placeholder-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {!isSignUp && (
                    <div className="flex items-center justify-end">
                      <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                        Forgot password?
                      </a>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2" size={18} />
                        {isSignUp ? "Creating Account..." : "Signing In..."}
                      </span>
                    ) : (
                      <>{isSignUp ? "Create Account" : "Sign In"}</>
                    )}
                  </Button>
                </form>

                {supabaseAvailable && (
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        GitHub
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("facebook")}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Facebook
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
        duration={6000}
        showProgress={true}
      />
    </div>
  )
}

