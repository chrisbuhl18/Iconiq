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
      answer: "Yes! Your customized portal lets you add employees as needed, all using your branded logo animation. If you’d like us to integrate each new employee’s headshot into the animation, there’s a one‑time $50 fee per user.",
    },
  ]

  const signatureSteps = [
    {
      title: "Select Your Package",
      description: "Choose the plan that fits your team and upload your brand assets through our easy-to-use portal.",
    },
    {
      title: "Pick Your Design",
      description: "Select from our signature templates or request a custom design.",
    },
    {
      title: "Design & Animation",
      description: "Our team creates your custom animated signatures based on your brand.",
    },
    {
      title: "Review & Approve",
      description:
        "We’ll create one for you to review and approve before rolling it out with our simple installation process.",
    },
  ]

  return (
    <ProductLayout productType="signatures" bgColor="bg-misty-rose" textColor="text-english-violet" logoVariant="rose">
      <Hero
        title="Email Signatures that bring your brand to life"
        subtitle="Every year, thousands of emails are sent—each one an opportunity to stand out. Imagine if every email included a unique animated brand token."
        bgColor="bg-misty-rose"
        textColor="text-english-violet"
        buttonText="See Pricing"
        buttonLink="#pricing"
        image={<SignatureMockup />}
      />

      <SignatureProductOverview
        title="Thousands of impressions every year"
        description="Your emails aren’t just messages; they’re opportunities to make an impression. Each custom animated signature features:"
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
        description="Every package includes installation and two revision rounds, ensuring your animation is flawlessly crafted. If additional revisions are needed, we’ll provide a personalized quote."
        products={null} // Pass null, component will fetch on client side
      />

      <FAQ title="Frequently Asked Questions" faqs={signatureFaqs} />

      <Footer />
    </ProductLayout>
  )
}
