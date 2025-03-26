"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft,
  Book,
  History,
  Film,
  Vote,
  PlusCircle,
  Calendar,
  Clock,
  Users,
  ThumbsUp
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock current readings data
const currentReadings = [
  {
    id: 1,
    title: "Capital in the Twenty-First Century",
    author: "Thomas Piketty",
    progress: 65,
    nextMeeting: "2024-04-15",
    participants: 12,
    chapters: "Chapters 5-7 this week"
  },
  {
    id: 2,
    title: "The New Jim Crow",
    author: "Michelle Alexander",
    progress: 30,
    nextMeeting: "2024-04-22",
    participants: 15,
    chapters: "Chapters 3-4 this week"
  }
]

// Mock upcoming movies
const upcomingMovies = [
  {
    id: 1,
    title: "Pride",
    date: "2024-04-18",
    time: "19:00",
    location: "Community Center",
    rsvps: 25
  },
  {
    id: 2,
    title: "Salt of the Earth",
    date: "2024-05-02",
    time: "19:00",
    location: "Community Center",
    rsvps: 18
  }
]

// Mock past readings data
const pastReadings = [
  {
    id: 1,
    title: "The Wretched of the Earth",
    author: "Frantz Fanon",
    completedDate: "2024-03-01",
    participants: 18,
    rating: 4.5,
    discussions: 6
  },
  {
    id: 2,
    title: "Society of the Spectacle",
    author: "Guy Debord",
    completedDate: "2024-02-15",
    participants: 14,
    rating: 4.2,
    discussions: 5
  },
  {
    id: 3,
    title: "Pedagogy of the Oppressed",
    author: "Paulo Freire",
    completedDate: "2024-01-20",
    participants: 20,
    rating: 4.8,
    discussions: 8
  }
]

// Mock movie projections data
const movieProjections = [
  {
    id: 1,
    title: "Pride",
    date: "2024-04-18",
    time: "19:00",
    location: "Community Center",
    description: "The true story of LGBT activists supporting miners during their lengthy strike of the National Union of Mineworkers in the summer of 1984.",
    rsvps: 25,
    totalSeats: 40,
    director: "Matthew Warchus",
    year: "2014",
    duration: "120min"
  },
  {
    id: 2,
    title: "Salt of the Earth",
    date: "2024-05-02",
    time: "19:00",
    location: "Community Center",
    description: "Based on the 1951 strike against the Empire Zinc Company in New Mexico, focusing on the role of women in the strike.",
    rsvps: 18,
    totalSeats: 40,
    director: "Herbert J. Biberman",
    year: "1954",
    duration: "94min"
  }
]

// Mock voting options
const votingOptions = [
  {
    id: 1,
    title: "Manufacturing Consent",
    author: "Noam Chomsky",
    votes: 12,
    category: "Media Studies",
    proposedBy: "Sarah Chen",
    description: "Analysis of the mass media and its role in shaping public opinion."
  },
  {
    id: 2,
    title: "The Dispossessed",
    author: "Ursula K. Le Guin",
    votes: 9,
    category: "Fiction",
    proposedBy: "James Wilson",
    description: "Exploration of anarchist and socialist themes through science fiction."
  },
  {
    id: 3,
    title: "Four Futures",
    author: "Peter Frase",
    votes: 7,
    category: "Political Theory",
    proposedBy: "Alex Rivera",
    description: "Analysis of possible post-capitalist futures."
  }
]

// Mock reading propositions
const readingPropositions = [
  {
    id: 1,
    title: "Mutual Aid",
    author: "Peter Kropotkin",
    proposedBy: "Maria Garcia",
    date: "2024-03-25",
    category: "Political Theory",
    description: "A factor of evolution and human development through cooperation.",
    supporters: 5,
    status: "Under Review"
  },
  {
    id: 2,
    title: "The Right to the City",
    author: "Henri Lefebvre",
    proposedBy: "David Kim",
    date: "2024-03-23",
    category: "Urban Studies",
    description: "Analysis of urban development and social justice.",
    supporters: 3,
    status: "Under Review"
  }
]

export default function PoliEdPage() {
  const [activeSection, setActiveSection] = useState("current")
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-8 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="CommonsSense Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-sm font-bold tracking-tight">PoliEd</span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("current")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === "current" ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Book size={20} />
              <span>Current Readings</span>
            </button>
            
            <button
              onClick={() => setActiveSection("past")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === "past" ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <History size={20} />
              <span>Past Readings</span>
            </button>
            
            <button
              onClick={() => setActiveSection("movies")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === "movies" ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Film size={20} />
              <span>Movie Projections</span>
            </button>
            
            <button
              onClick={() => setActiveSection("voting")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === "voting" ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Vote size={20} />
              <span>Voting</span>
            </button>
            
            <button
              onClick={() => setActiveSection("propositions")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === "propositions" ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <PlusCircle size={20} />
              <span>Reading Propositions</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeSection === "current" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Current Readings</h2>
              <div className="grid gap-6">
                {currentReadings.map((book) => (
                  <div key={book.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{book.title}</h3>
                        <p className="text-gray-400">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users size={16} />
                          <span>{book.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 transition-all duration-500"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={16} />
                          <span>Next Meeting: {book.nextMeeting}</span>
                        </div>
                        <div className="text-gray-400">{book.chapters}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upcoming Movies Preview */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Upcoming Movie Screenings</h3>
                <div className="grid gap-4">
                  {upcomingMovies.map((movie) => (
                    <div key={movie.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">{movie.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{movie.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{movie.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-400">{movie.rsvps} RSVPs</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "past" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Past Readings</h2>
              <div className="grid gap-6">
                {pastReadings.map((book) => (
                  <div key={book.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{book.title}</h3>
                        <p className="text-gray-400">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users size={16} />
                          <span>{book.participants} participants</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {book.discussions} discussions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                      <div>Completed: {book.completedDate}</div>
                      <div>Rating: {book.rating}/5</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "movies" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Movie Projections</h2>
              <div className="grid gap-6">
                {movieProjections.map((movie) => (
                  <div key={movie.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{movie.title}</h3>
                        <p className="text-gray-400">{movie.year} • {movie.duration} • Dir. {movie.director}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users size={16} />
                          <span>{movie.rsvps}/{movie.totalSeats} seats</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 mt-4">{movie.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={14} />
                        <span>{movie.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={14} />
                        <span>{movie.time}</span>
                      </div>
                    </div>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      RSVP for Screening
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "voting" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Vote on Next Reading</h2>
              <div className="grid gap-6">
                {votingOptions.map((option) => (
                  <div key={option.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{option.title}</h3>
                        <p className="text-gray-400">by {option.author}</p>
                        <p className="text-sm text-gray-400 mt-1">Proposed by {option.proposedBy}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{option.votes}</div>
                        <div className="text-sm text-gray-400">votes</div>
                      </div>
                    </div>
                    <p className="text-gray-400 mt-4">{option.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-400">{option.category}</span>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Vote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "propositions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Reading Propositions</h2>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Submit New Proposition
                </button>
              </div>
              <div className="grid gap-6">
                {readingPropositions.map((prop) => (
                  <div key={prop.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{prop.title}</h3>
                        <p className="text-gray-400">by {prop.author}</p>
                        <p className="text-sm text-gray-400 mt-1">Proposed by {prop.proposedBy} on {prop.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm">
                          {prop.status}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 mt-4">{prop.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-400">{prop.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{prop.supporters} supporters</span>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Support
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 