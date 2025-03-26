import type React from "react"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

// Client component for conditional rendering
import ClientLayout from "@/components/client-layout"

export const metadata = {
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
