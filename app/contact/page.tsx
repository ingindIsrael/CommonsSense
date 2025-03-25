import { ContactForm } from "@/components/contact-form"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Full screen background image */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-07%2015.23.31%20-%20A%20photorealistic%20version%20of%20the%20'CommonsSense'%20logo%20with%20real%20people,%20but%20without%20any%20text%20and%20featuring%20a%20larger%20crowd.%20The%20image%20should%20have%20a%20signi-9oWIWGWwhHpQuIU6cDYWofqS6y5hOS.webp"
          alt="Community Circle"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <TopBar />
      <main className="flex-grow flex items-center justify-center relative z-20 px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h1>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

