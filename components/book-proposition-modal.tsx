"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"

interface BookPropositionModalProps {
  isOpen: boolean
  onClose: () => void
  proposition: {
    title: string
    author: string
    description: string
    imageUrl: string
  }
}

export function BookPropositionModal({ isOpen, onClose, proposition }: BookPropositionModalProps) {
  const [loading, setLoading] = useState(false)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartY = e.touches[0].clientY;
    
    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const diff = touchCurrentY - touchStartY;
      
      if (diff > 50) {
        onClose();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
         onClick={onClose}>
      <div 
        className="bg-black/90 border border-white/10 rounded-xl max-w-md w-full overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
      >
        <div className="relative">
          <div className="h-48 bg-gradient-to-b from-gray-800 to-black">
            {proposition.imageUrl && (
              <img 
                src={proposition.imageUrl} 
                alt={proposition.title}
                className="w-full h-full object-cover opacity-60"
              />
            )}
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1">{proposition.title}</h3>
          <p className="text-gray-400 mb-4">by {proposition.author}</p>
          
          <div className="text-gray-300 mb-6 text-sm">
            <p>{proposition.description}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                  onClose()
                }, 1500)
              }}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
              {loading ? "Processing..." : "Add to Reading List"}
            </button>
            <button
              onClick={onClose}
              className="bg-transparent border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 