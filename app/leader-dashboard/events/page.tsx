"use client"

import { Calendar, Clock, MapPin, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Main Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Events</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Total Events" 
            value="24" 
            trend="+3" 
            icon={<Calendar size={24} />} 
          />
          <StatCard 
            title="Upcoming Events" 
            value="8" 
            trend="+2" 
            icon={<Clock size={24} />} 
          />
          <StatCard 
            title="Total Attendees" 
            value="1,456" 
            trend="+18%" 
            icon={<Users size={24} />} 
          />
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Community Meeting',
                date: 'Tomorrow at 6:00 PM',
                location: 'Main Hall',
                attendees: 45
              },
              {
                name: 'Workshop Series',
                date: 'Next Monday at 2:00 PM',
                location: 'Conference Room B',
                attendees: 30
              },
              {
                name: 'Monthly Social',
                date: 'July 15th at 7:00 PM',
                location: 'Community Center',
                attendees: 120
              }
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={16} />
                  <span className="text-sm">{event.attendees} attending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Past Events</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Leadership Training',
                date: 'June 1st, 2024',
                location: 'Training Center',
                attendees: 85
              },
              {
                name: 'General Assembly',
                date: 'May 15th, 2024',
                location: 'Main Hall',
                attendees: 150
              }
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={16} />
                  <span className="text-sm">{event.attendees} attended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className="flex items-center text-green-400">
          <TrendingUp size={16} className="mr-1" />
          <span>{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 