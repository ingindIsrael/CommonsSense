import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  const principles = [
    {
      title: "Radical Transparency",
      description: "We believe in open communication and sharing information freely within our community.",
    },
    {
      title: "Democratic Decision-Making",
      description: "Every voice matters. We make decisions collectively, ensuring everyone has a say.",
    },
    {
      title: "Solidarity Over Competition",
      description: "We prioritize mutual support and collaboration over individual gain.",
    },
    {
      title: "Internal Coordination",
      description: "We work together seamlessly, aligning our efforts for maximum impact.",
    },
  ]

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
      <main className="flex-grow flex flex-col items-center justify-center relative z-20 px-4 py-16">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">About CommonsSense</h2>
            <p className="text-lg text-white/80">Empowering communities through shared values and collective action.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <CardTitle>{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

