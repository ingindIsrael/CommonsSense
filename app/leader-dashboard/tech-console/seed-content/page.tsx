"use client"

import { useState, useEffect } from "react"
import { BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"
import { ConfirmModal } from "../components/confirm-modal"

interface Book {
  id: number
  title: string
  status: string
}

interface Movie {
  id: number
  title: string
  release_date: string
}

export default function SeedContentPage() {
  const [showSeedWarning, setShowSeedWarning] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState<Book[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [booksRes, moviesRes] = await Promise.all([
          fetch('/api/education/books'),
          fetch('/api/education/movies')
        ])

        if (!booksRes.ok || !moviesRes.ok) {
          const booksError = await booksRes.text()
          const moviesError = await moviesRes.text()
          console.error('Books response:', booksError)
          console.error('Movies response:', moviesError)
          throw new Error(`Failed to fetch content: ${!booksRes.ok ? 'Books ' + booksRes.status : ''} ${!moviesRes.ok ? 'Movies ' + moviesRes.status : ''}`)
        }

        const booksData = await booksRes.json()
        const moviesData = await moviesRes.json()

        console.log('Books data:', booksData)
        console.log('Movies data:', moviesData)

        setBooks(booksData)
        setMovies(moviesData)
      } catch (err: any) {
        setError(err.message || "Failed to load content")
        console.error('Content fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    try {
      const response = await fetch('/api/database/seed', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed database')
      }

      // Refresh the content after seeding
      const [booksRes, moviesRes] = await Promise.all([
        fetch('/api/education/books'),
        fetch('/api/education/movies')
      ])

      const booksData = await booksRes.json()
      const moviesData = await moviesRes.json()

      setBooks(booksData)
      setMovies(moviesData)

      alert('Database seeded successfully!')
    } catch (error: any) {
      console.error('Seeding error:', error)
      alert(error.message || 'Failed to seed database. Check console for details.')
    } finally {
      setIsSeeding(false)
      setShowSeedWarning(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/leader-dashboard/tech-console" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Tech Console
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Seed Educational Content</h1>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-red-500" size={24} />
            <h2 className="text-xl font-bold">Content Management</h2>
          </div>
          
          {error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-2">Books</h3>
                <p className="text-gray-400 mb-4">Political theory and educational texts</p>
                <pre className="bg-black/50 p-4 rounded-lg text-sm font-mono text-gray-300">
                  {books.length > 0 ? (
                    books.map(book => `${book.title} (${book.status})\n`).join('')
                  ) : (
                    'No books in database'
                  )}
                </pre>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg">
                <h3 className="font-medium mb-2">Movies</h3>
                <p className="text-gray-400 mb-4">Historical and educational films</p>
                <pre className="bg-black/50 p-4 rounded-lg text-sm font-mono text-gray-300">
                  {movies.length > 0 ? (
                    movies.map(movie => `${movie.title} (${movie.release_date})\n`).join('')
                  ) : (
                    'No movies in database'
                  )}
                </pre>
              </div>

              <button
                onClick={() => setShowSeedWarning(true)}
                disabled={isSeeding}
                className="w-full p-4 bg-red-500 hover:bg-red-600 disabled:bg-red-800 text-white rounded-lg transition-colors"
              >
                {isSeeding ? 'Seeding Database...' : 'Start Seeding Process'}
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showSeedWarning}
        onClose={() => setShowSeedWarning(false)}
        onConfirm={handleSeedDatabase}
        title="Seed Educational Content"
        message="This will add initial books and movies data to the database. Existing data may be affected. Are you sure you want to continue?"
      />
    </div>
  )
} 