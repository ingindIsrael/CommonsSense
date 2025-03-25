import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function TermsOfServicePage() {
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
      <main className="flex-grow relative z-20 px-4 py-16 overflow-auto">
        <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-md p-8 rounded-lg text-white">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the CommonsSense service, you agree to be bound by these Terms of Service. If you
                disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
              <p>
                CommonsSense provides a platform for community organization and decision-making. We reserve the right to
                modify or discontinue, temporarily or permanently, the service with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
              <p>
                You are responsible for safeguarding the password that you use to access the service and for any
                activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. User Content</h2>
              <p>
                You retain all rights to any content you submit, post or display on or through the service. By
                submitting, posting or displaying content, you grant us a worldwide, non-exclusive, royalty-free license
                to use, reproduce, adapt, publish, translate and distribute it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Prohibited Uses</h2>
              <p>
                You may not use the service for any illegal purpose or to violate any laws in your jurisdiction. You may
                not use the service to distribute unsolicited promotional or commercial content or interfere with
                others' use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Termination</h2>
              <p>
                We may terminate or suspend access to our service immediately, without prior notice or liability, for
                any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p>
                In no event shall CommonsSense, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What
                constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-2">
                Email: legal@commonssense.com
                <br />
                Address: 123 Main St, Anytown, AN 12345, Country
              </p>
            </section>

            <p className="text-sm mt-8">Last Updated: February 7, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

