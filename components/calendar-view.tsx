"use client"

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventInput } from '@fullcalendar/core'

interface CalendarViewProps {
  events?: EventInput[]
  onEventClick?: (info: any) => void
  onDateSelect?: (info: any) => void
}

export function CalendarView({ events = [], onEventClick, onDateSelect }: CalendarViewProps) {
  const [view, setView] = useState('dayGridMonth')

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventContent={renderEventContent}
        eventClick={onEventClick}
        select={onDateSelect}
        height="auto"
        // Custom styling
        className="fc-theme-custom"
      />

      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(255, 255, 255, 0.1);
          --fc-button-bg-color: rgba(255, 255, 255, 0.1);
          --fc-button-border-color: rgba(255, 255, 255, 0.1);
          --fc-button-hover-bg-color: rgba(255, 255, 255, 0.2);
          --fc-button-hover-border-color: rgba(255, 255, 255, 0.2);
          --fc-button-active-bg-color: rgba(255, 255, 255, 0.3);
          --fc-today-bg-color: rgba(255, 255, 255, 0.05);
          --fc-page-bg-color: transparent;
        }

        .fc-theme-custom {
          background: transparent;
        }

        .fc-theme-custom .fc-toolbar-title {
          color: white;
        }

        .fc-theme-custom .fc-button {
          color: rgba(255, 255, 255, 0.8);
        }

        .fc-theme-custom .fc-button:hover {
          color: white;
        }

        .fc-theme-custom .fc-daygrid-day-number,
        .fc-theme-custom .fc-col-header-cell-cushion {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
        }

        .fc-theme-custom .fc-event {
          background-color: rgba(220, 38, 38, 0.8);
          border: none;
          backdrop-filter: blur(4px);
        }

        .fc-theme-custom .fc-event:hover {
          background-color: rgba(220, 38, 38, 0.9);
        }

        .fc-theme-custom .fc-daygrid-day.fc-day-today {
          background-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  )
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="fc-event-content p-1">
      <div className="font-medium">{eventInfo.event.title}</div>
      {eventInfo.timeText && (
        <div className="text-xs opacity-75">{eventInfo.timeText}</div>
      )}
    </div>
  )
} 