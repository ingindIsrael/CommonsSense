"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    // Here you would typically send the form data to your backend
    // For this example, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitMessage("Thank you for your message. We'll get back to you soon!")
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="bg-transparent border-white/10 text-white placeholder-white/50 focus:bg-black/30 focus:backdrop-blur-md transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white flex items-center gap-2">
          Email
          <span className="text-sm text-white/70">(Optional)</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="bg-transparent border-white/10 text-white placeholder-white/50 focus:bg-black/30 focus:backdrop-blur-md transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">
          Message
        </Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          required
          className="bg-transparent border-white/10 text-white placeholder-white/50 focus:bg-black/30 focus:backdrop-blur-md transition-all duration-300 min-h-[100px]"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {submitMessage && <p className="text-green-400 text-center mt-4">{submitMessage}</p>}
    </form>
  )
}

