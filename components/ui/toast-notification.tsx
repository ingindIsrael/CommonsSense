"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ToastNotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function ToastNotification({
  message,
  isVisible,
  onClose,
  duration = 5000,
}: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close notification"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <div className="mb-4 mx-auto w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
          <p className="text-gray-300">{message}</p>
        </div>
      </div>
    </div>
  )
} 