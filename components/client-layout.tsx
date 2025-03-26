"use client"

import { usePathname } from 'next/navigation'
import { TopBar } from "@/components/top-bar"

function shouldShowTopBar(pathname: string) {
  // Don't show TopBar in leader dashboard routes
  return !pathname.startsWith('/leader-dashboard')
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      {shouldShowTopBar(pathname) && <TopBar />}
      <main className="min-h-screen pb-16">{children}</main>
    </>
  )
} 