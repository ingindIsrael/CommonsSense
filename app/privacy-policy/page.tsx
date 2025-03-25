import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to CommonsSense. We are committed to protecting your personal information and your right to
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <p>
                We collect personal information that you provide to us such as name, email address, and other contact
                information. We also collect information automatically when you use our service, including usage data
                and cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to communicate with
                you, and to comply with legal obligations. We may also use your information for research and analytics
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Sharing Your Information</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with
                service providers, business partners, and other third parties to help us operate our business and
                provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You can also object to or
                restrict certain processing of your data. To exercise these rights, please contact us using the
                information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Security</h2>
              <p>
                We use appropriate technical and organizational measures to protect your personal information. However,
                no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">
                Email: privacy@commonssense.com
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

