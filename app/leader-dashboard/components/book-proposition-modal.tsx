"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"

interface BookPropositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: BookPropositionData) => Promise<void>
}

export interface BookPropositionData {
  title: string
  synopsis: string
  main_ideas: string
  author: string
}

export function BookPropositionModal({ isOpen, onClose, onSubmit }: BookPropositionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookPropositionData>({
    title: '',
    synopsis: '',
    main_ideas: '',
    author: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        title: '',
        synopsis: '',
        main_ideas: '',
        author: ''
      })
      onClose()
    } catch (error) {
      console.error('Error submitting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/90 border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <h2 className="text-xl font-bold">Submit New Book Proposition</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:border-white/25 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:border-white/25 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="synopsis" className="block text-sm font-medium mb-2">
              Synopsis
            </label>
            <textarea
              id="synopsis"
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:border-white/25 focus:outline-none min-h-[100px]"
              required
            />
          </div>

          <div>
            <label htmlFor="main_ideas" className="block text-sm font-medium mb-2">
              Main Ideas
            </label>
            <textarea
              id="main_ideas"
              value={formData.main_ideas}
              onChange={(e) => setFormData({ ...formData, main_ideas: e.target.value })}
              className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:border-white/25 focus:outline-none min-h-[100px]"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Proposition'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 