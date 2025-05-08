import ContactForm from "@/components/contact-form"
import BookDemo from "@/components/book-demo"
import Logo from "@/components/logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Lumio",
  description: "Get in touch with the Lumio team to learn more about our animated email solutions.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-periwinkle/30 to-misty-rose/30">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between max-w-full">
          {/* Logo - always on the left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div style={{ transform: "scale(0.8)", transformOrigin: "left center" }}>
                <Logo size="large" variant="dark" className="md:hidden" />
                <Logo size="large" variant="dark" className="hidden md:block" />
              </div>
            </Link>
          </div>

          {/* Desktop-only center navigation */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex items-center space-x-2 bg-white/20 rounded-full p-1">
            <Link href="/avatars">
              <div className="px-4 py-2 rounded-full transition-all hover:bg-periwinkle hover:text-english-violet">
                Avatars
              </div>
            </Link>
            <Link href="/signatures">
              <div className="px-4 py-2 rounded-full transition-all hover:bg-misty-rose hover:text-english-violet">
                Signatures
              </div>
            </Link>
          </div>

          {/* Mobile-only product toggle - right aligned */}
          <div className="md:hidden flex items-center space-x-1 bg-white/20 rounded-full p-1 mr-2">
            <Link href="/avatars">
              <div className="px-3 py-1.5 text-sm rounded-full transition-all hover:bg-periwinkle hover:text-english-violet">
                Avatars
              </div>
            </Link>
            <Link href="/signatures">
              <div className="px-3 py-1.5 text-sm rounded-full transition-all hover:bg-misty-rose hover:text-english-violet">
                Signatures
              </div>
            </Link>
          </div>

          {/* Desktop-only right side elements */}
          <div className="hidden md:flex items-center justify-end space-x-4">
            <Link href="/contact">
              <Button className="bg-black hover:bg-black/90 text-white rounded-full px-6 bg-opacity-80">Contact</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-md text-english-violet mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-700 mb-8">
            Have questions about our animated email solutions? We're here to help! Fill out the form below or chat with
            our AI assistant to get started.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form and AI Assistant */}
            <div className="lg:col-span-2 space-y-8">
              <ContactForm />
            </div>

            {/* Book a Demo Section */}
            <div className="lg:col-span-1">
              <BookDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
