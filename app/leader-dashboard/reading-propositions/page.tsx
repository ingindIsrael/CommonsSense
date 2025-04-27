"use client"

import { useState } from "react"
import { BookOpen, Plus } from "lucide-react"
import { BookPropositionModal, BookPropositionData } from "@/app/components/book-proposition-modal"
import toast from 'react-hot-toast'

export default function ReadingPropositionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (data: BookPropositionData) => {
    console.log('🚀 Making POST request with data:', data)
    
    try {
      const response = await fetch('/api/education/book-propositions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json()
      console.log('📨 Server response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit book proposition')
      }

      toast.success('Book proposition submitted successfully!')
      setIsModalOpen(false)
    } catch (error) {
      console.error('❌ Request failed:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit proposition')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen size={24} />
            <h1 className="text-3xl font-bold">Reading Propositions</h1>
          </div>
          
          <button
            onClick={() => {
              console.log('🔘 New Proposition button clicked');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus size={20} />
            New Proposition
          </button>
        </div>
        
        <BookPropositionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
} 