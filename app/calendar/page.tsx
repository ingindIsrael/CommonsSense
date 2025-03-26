"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  Users,
  Plus,
  Clock,
  MapPin,
  Tag
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CalendarView } from "@/components/calendar-view"

// Update the events data to match FullCalendar format
const events = [
  { 
    id: '1',
    title: 'Team Meeting',
    start: '2024-02-15T10:00:00',
    end: '2024-02-15T11:30:00',
    extendedProps: {
      location: 'Conference Room A',
      type: 'Meeting',
      attendees: 12
    }
  },
  { 
    id: '2',
    title: 'Training Session',
    start: '2024-02-16T14:00:00',
    end: '2024-02-16T16:00:00',
    extendedProps: {
      location: 'Training Room B',
      type: 'Training',
      attendees: 25
    }
  },
  { 
    id: '3',
    title: 'Community Event',
    start: '2024-02-18',
    end: '2024-02-19',
    allDay: true,
    extendedProps: {
      location: 'Community Center',
      type: 'Social',
      attendees: 100
    }
  }
]

const eventTypes = [
  { id: 'meeting', name: 'Meetings', color: 'bg-blue-500' },
  { id: 'training', name: 'Training', color: 'bg-green-500' },
  { id: 'social', name: 'Social', color: 'bg-purple-500' },
  { id: 'campaign', name: 'Campaign', color: 'bg-red-500' },
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const router = useRouter()

  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event)
    // Add event details modal here
  }

  const handleDateSelect = (info: any) => {
    console.log('Date selected:', info)
    // Add new event modal here
  }

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
            <span className="text-sm font-bold tracking-tight">Calendar</span>
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6">
          {/* Create Event Button */}
          <button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={20} />
            <span>Create Event</span>
          </button>

          {/* Event Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">EVENT TYPES</h3>
            <div className="space-y-2">
              {eventTypes.map((type) => (
                <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  <span className={`w-2 h-2 rounded-full ${type.color}`} />
                  <span>{type.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">UPCOMING EVENTS</h3>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="bg-white/5 p-3 rounded-lg space-y-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users size={14} />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar - only back button, no About/Contact */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Calendar Area */}
        <div className="p-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <CalendarView 
              events={events}
              onEventClick={handleEventClick}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 