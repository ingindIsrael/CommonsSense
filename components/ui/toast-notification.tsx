"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface ToastNotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
  showProgress?: boolean
}

export function ToastNotification({
  message,
  isVisible,
  onClose,
  duration = 6000,
  showProgress = false
}: ToastNotificationProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isVisible && showProgress) {
      setProgress(100)
      const startTime = Date.now()
      const endTime = startTime + duration

      const updateProgress = () => {
        const now = Date.now()
        const remaining = endTime - now
        const newProgress = (remaining / duration) * 100
        
        if (remaining > 0) {
          setProgress(newProgress)
          requestAnimationFrame(updateProgress)
        } else {
          setProgress(0)
          onClose()
        }
      }

      requestAnimationFrame(updateProgress)
    }
  }, [isVisible, duration, onClose, showProgress])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full relative overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-800">{message}</p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {showProgress && (
          <div className="h-1 w-full bg-gray-200 absolute bottom-0 left-0">
            <div
              className="h-full bg-green-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
} 