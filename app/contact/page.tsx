import ContactForm from "@/components/contact-form"
import BookDemo from "@/components/book-demo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Lumio",
  description: "Get in touch with the Lumio team to learn more about our animated email solutions.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-periwinkle/30 to-misty-rose/30">
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
