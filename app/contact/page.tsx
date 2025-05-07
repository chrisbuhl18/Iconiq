import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Lumio",
  description: "Get in touch with the Lumio team for questions about our email avatars and signatures.",
  openGraph: {
    images: ["/og-image.png"],
  },
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-periwinkle via-champagne to-misty-rose bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions about our email avatars or signatures? Need help with implementation? Our team is here to
            help you elevate your email communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-periwinkle to-english-violet text-white">
                <CardTitle className="text-xl">Book a Demo</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-6">
                  Want to see Lumio in action? Schedule a personalized demo with our team to learn how our solutions can
                  transform your email communication.
                </p>
                <Button asChild className="w-full bg-english-violet hover:bg-english-violet/90">
                  <Link href="https://calendly.com/your-calendly-link" target="_blank">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
