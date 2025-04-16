import ProductLayout from "@/components/product-layout"
import Hero from "@/components/hero"
import SignatureProductOverview from "@/components/signature-product-overview"
import HowItWorks from "@/components/how-it-works"
import SignaturePricingCalculator from "@/components/signature-pricing-calculator"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import SignatureMockup from "@/components/signature-mockup"
import type { Metadata } from "next"

// Skip server-side data fetching during build
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Animated Email Signatures",
  description: "Bring your brand to life with animated email signatures that make a lasting impression.",
  openGraph: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
    url: "https://lumio.vercel.app/signatures",
    images: [
      {
        url: "/og-image-signatures.png",
        width: 1200,
        height: 630,
        alt: "Lumio - Animated Email Signatures",
      },
    ],
  },
  twitter: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
    images: ["/og-image-signatures.png"],
  },
}

export default function SignaturesPage() {
  const signatureFaqs = [
    {
      question: "Which email clients support animated signatures?",
      answer:
        "Animated signatures are supported by both Gmail and Outlook, covering the majority of business email users.",
    },
    {
      question: "How do I install the animated signature?",
      answer:
        "Upon purchase, we'll provide step-by-step instructions and oversee the installation process to ensure everything works correctly.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "All packages include 2 rounds of revisions to ensure you're completely satisfied with your animated signature.",
    },
    {
      question: "Can I add new employees later?",
      answer: "Yes! We offer a special onboarding price of $250 for one-off additions to your existing package.",
    },
  ]

  const signatureSteps = [
    {
      title: "Purchase & Submit",
      description: "Choose your package and submit your brand assets through our form.",
    },
    {
      title: "Template Selection",
      description: "Select from our signature templates or request a custom design.",
    },
    {
      title: "Design & Animation",
      description: "Our team creates your custom animated signatures based on your brand.",
    },
    {
      title: "Review & Approve",
      description: "Review with one employee first, then we'll set up for your entire team.",
    },
  ]

  return (
    <ProductLayout productType="signatures" bgColor="bg-misty-rose" textColor="text-english-violet" logoVariant="rose">
      <Hero
        title="Email Signatures that bring your brand to life"
        subtitle="Thousands of emails are sent by each user each year. Imagine the reach with each user having a unique animated brand token."
        bgColor="bg-misty-rose"
        textColor="text-english-violet"
        buttonText="See Pricing"
        buttonLink="#pricing"
        image={<SignatureMockup />}
      />

      <SignatureProductOverview
        title="Thousands of impressions every year"
        description="Each team member sends thousands of emails annually. Imagine the reach with each user having a unique brand token."
        features={[
          "Works in Gmail and Outlook",
          "Animated logo with headshot transition",
          "Consistent branding across your team",
          "Easy onboarding for new team members",
        ]}
        image="/placeholder.svg?height=400&width=600"
      />

      <HowItWorks title="How It Works" steps={signatureSteps} />

      {/* Client component that will fetch products on the client side */}
      <SignaturePricingCalculator
        title="Build Your Package"
        description="All purchases include 2 rounds of revision, installation oversight, and step-by-step instructions."
        products={null} // Pass null, component will fetch on client side
      />

      <FAQ title="Frequently Asked Questions" faqs={signatureFaqs} />

      <Footer />
    </ProductLayout>
  )
}
