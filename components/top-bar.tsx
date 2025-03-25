import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-white hover:text-red-500">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-red-500">
                Contact
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

