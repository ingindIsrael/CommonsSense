"use client"

import Link from "next/link"
import Image from "next/image"

export function AuthTopBar() {
  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-14 h-12 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="CommonsSense Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">CommonsSense</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 