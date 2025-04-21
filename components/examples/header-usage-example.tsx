import SiteHeader from "@/components/site-header"

export default function HeaderUsageExample() {
  // For homepage
  const homepageHeader = (
    <SiteHeader
      transparent={true}
      logoSize="large"
      navItems={[
        { label: "Avatars", href: "/avatars" },
        { label: "Signatures", href: "/signatures" },
        { label: "Pricing", href: "#pricing" },
      ]}
      ctaButton={{ label: "Get Started", href: "#get-started" }}
    />
  )

  // For product pages
  const productHeader = (
    <SiteHeader
      transparent={false}
      logoSize="medium"
      navItems={[
        { label: "Avatars", href: "/avatars", active: true },
        { label: "Signatures", href: "/signatures" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
      ]}
      ctaButton={{ label: "Contact", href: "#contact" }}
    />
  )

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-4">Homepage Header</h2>
        {homepageHeader}
      </div>

      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-4">Product Page Header</h2>
        {productHeader}
      </div>
    </div>
  )
}
