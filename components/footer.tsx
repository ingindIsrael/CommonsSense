import Link from "next/link"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-black/20 border-t border-white/10 z-40">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CommonsSense. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/70 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

