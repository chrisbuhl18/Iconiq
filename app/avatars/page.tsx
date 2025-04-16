import ProductLayout from "@/components/product-layout"
import Hero from "@/components/hero"
import ProductOverview from "@/components/product-overview"
import HowItWorks from "@/components/how-it-works"
import AvatarPricingCalculator from "@/components/avatar-pricing-calculator"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import AvatarMockup from "@/components/avatar-mockup"
import GmailOnlyBadge from "@/components/gmail-only-badge"

// Skip server-side data fetching during build
export const dynamic = "force-dynamic"

export default function AvatarsPage() {
  const avatarFaqs = [
    {
      question: "Which email clients support animated avatars?",
      answer:
        "Currently, animated avatars are only supported in Gmail. However, in other email clients, the first frame will display as a static image.",
    },
    {
      question: "How do I install the animated avatar?",
      answer:
        "Upon purchase, we'll provide step-by-step instructions and oversee the installation process to ensure everything works correctly.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "All packages include 2 rounds of revisions to ensure you're completely satisfied with your animated avatar.",
    },
    {
      question: "Can I use the animations elsewhere?",
      answer: "The Premium package includes animated files for additional use beyond email.",
    },
  ]

  const avatarSteps = [
    {
      title: "Purchase & Submit",
      description: "Choose your package and submit your brand assets through our form.",
    },
    {
      title: "Design & Animation",
      description: "Our team creates your custom animated avatar based on your brand.",
    },
    {
      title: "Review & Revise",
      description: "Review the animation and request up to 2 rounds of revisions.",
    },
    {
      title: "Installation",
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

      <ProductOverview
        title="Stand out in the sea of noise"
        description="First impressions matter. Our animated email avatars bring your brand to life right in your audience's inbox."
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
            <p className="mb-2">All purchases include installation and 2 rounds of revision.</p>
            <p className="text-sm text-gray-600 font-medium">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs mr-2">
                Note
              </span>
              Currently supported on Gmail only. Other email clients will display a static image.
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
