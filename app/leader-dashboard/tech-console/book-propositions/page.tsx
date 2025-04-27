"use client"

import { useState } from "react"
import { createClient } from '@supabase/supabase-js'
import { BookOpen, Loader2 } from "lucide-react"

interface BookProposition {
  title: string
  synopsis: string
  main_ideas: string
  author: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function BookPropositionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookProposition>({
    title: '',
    synopsis: '',
    main_ideas: '',
    author: '',
    status: 'pending'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/education/book-propositions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit book proposition')
      }

      // Reset form
      setFormData({
        title: '',
        synopsis: '',
        main_ideas: '',
        author: '',
        status: 'pending'
      })

      alert('Book proposition submitted successfully!')
    } catch (error) {
      console.error('Error submitting book:', error)
      alert('Failed to submit book proposition. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={24} />
          <h1 className="text-3xl font-bold">Submit Book Proposition</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Book Proposition'
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 