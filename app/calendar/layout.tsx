export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {children}
    </div>
  )
} 