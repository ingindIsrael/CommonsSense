"use client"
// Handles conditional TopBar rendering based on route
// Shows TopBar except in leader-dashboard routes

import { usePathname } from 'next/navigation'
import { TopBar } from "@/components/top-bar"

function shouldShowTopBar(pathname: string) {
  // Don't show TopBar in authenticated routes
  const authenticatedRoutes = [
    '/leader-dashboard',
    '/dashboard',
    '/menu',
    '/calendar',
    '/financial',
    '/resources',
    '/campaigns',
    '/shop',
    '/social',
    '/polied'
  ]
  
  return !authenticatedRoutes.some(route => pathname.startsWith(route))
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