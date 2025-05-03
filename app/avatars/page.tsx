import ProductLayout from "@/components/product-layout"
import Hero from "@/components/hero"
import AvatarProductOverview from "@/components/avatar-product-overview"
import HowItWorks from "@/components/how-it-works"
import AvatarPricingCalculator from "@/components/avatar-pricing-calculator"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import AvatarMockup from "@/components/avatar-mockup"
import GmailOnlyBadge from "@/components/gmail-only-badge"
import type { Metadata } from "next"

// Skip server-side data fetching during build
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Animated Email Avatars",
  description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
  openGraph: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
    url: "https://lumio.vercel.app/avatars",
    images: [
      {
        url: "/og-image-avatars.png",
        width: 1200,
        height: 630,
        alt: "Lumio - Animated Email Avatars",
      },
    ],
  },
  twitter: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
    images: ["/og-image-avatars.png"],
  },
}

export default function AvatarsPage() {
  const avatarFaqs = [
    {
      question: "Which email clients support animated avatars?",
      answer: "Currently, animated avatars are supported in Gmail, with other clients displaying a static brand logo.",
    },
    {
      question: "How do I install the animated avatar?",
      answer: "We provide simple, step-by-step instructions and hands-on support to ensure smooth installation.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "Each package includes up to two rounds of revisions to ensure your animation is just right. If additional revisions are needed, we’ll provide a personalized quote.",
    },
    {
      question: "Can I use the animations elsewhere?",
      answer:
        "The Premium package includes animated files for additional use beyond email. Many clients repurpose animations for social media, websites, and more. Just ask for tips!",
    },
  ]

  const avatarSteps = [
    {
      title: "Choose Your Package",
      description: "Select the package that fits your needs and share your brand assets.",
    },
    {
      title: "Design & Animation",
      description: "Our team craft animations uniquely tailored to your brand identity.",
    },
    {
      title: "Review & Revise",
      description: "Share your input with up to 2 rounds of revisions to ensure it’s just right.",
    },
    {
      title: "Simple Installation",
      description: "We'll provide step-by-step instructions and oversee the installation process.",
    },
  ]

  return (
    <ProductLayout productType="avatars" bgColor="bg-periwinkle" textColor="text-english-violet" logoVariant="pale">
      <Hero
        title={
          <div className="flex items-center flex-wrap gap-3">
            <span>Animated Email Avatars that capture attention</span>
            <GmailOnlyBadge />
          </div>
        }
        subtitle="Add energy and pop when your email lands in your audience's inbox. Stand out in the sea of noise with custom animations."
        bgColor="bg-periwinkle"
        textColor="text-english-violet"
        buttonText="See Pricing"
        buttonLink="#pricing"
        image={<AvatarMockup />}
      />

      <AvatarProductOverview
        title="Cut Through the Inbox Clutter."
        description="First impressions are everything. With Lumio's animated email avatars, your brand becomes the highlight of every inbox, leaving a professional and unforgettable mark."
        features={[
          "Perfect for Email Marketing",
          "Great for Announcements",
          "Enhances Customer Engagement",
          "Works in Gmail (static fallback for other clients)",
        ]}
        image="/placeholder.svg?height=400&width=600"
      />

      <HowItWorks title="How It Works" steps={avatarSteps} />

      {/* Client component that will fetch products on the client side */}
      <AvatarPricingCalculator
        title="Choose Your Package"
        description={
          <div className="text-center">
            <p className="mb-2">
              Every package includes installation and two revision rounds, ensuring your animation is flawlessly
              crafted. If additional revisions are needed, we’ll provide a personalized quote.
            </p>
            <p className="text-sm text-gray-600 font-medium">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs mr-2">
                Note
              </span>
              Currently optimized for Gmail (other email clinets will display brand logo image).
            </p>
          </div>
        }
        products={null} // Pass null, component will fetch on client side
      />

      <FAQ title="Frequently Asked Questions" faqs={avatarFaqs} />

      <Footer />
    </ProductLayout>
  )
}
