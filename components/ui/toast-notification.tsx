"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function ToastNotification({ message, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-lg border border-white/10 shadow-xl">
        <p>{message}</p>
      </div>
    </div>
  )
} 