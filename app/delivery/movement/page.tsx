import type { Metadata } from "next"
import { SignatureDeliveryPage } from "@/components/signature-delivery-page"
import { movementEmployees } from "@/data/movement-employees"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"

export const metadata: Metadata = {
  title: "Movement Email Signatures | Lumio",
  description: "Access and customize your Movement email signature",
}

export default function MovementDeliveryPage() {
  const companyInfo = {
    name: "Movement",
    logo: "/dynamic-motion-logo.png",
    primaryColor: "#4F46E5",
    secondaryColor: "#818CF8",
    signatureTemplates: [
      { id: "standard", name: "Standard", description: "Our professional standard signature" },
      { id: "minimal", name: "Minimal", description: "A clean, minimal design" },
      { id: "animated", name: "Animated", description: "With animated avatar (recommended)" },
    ],
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex justify-end mb-4">
        <Link href="/signature-templates">
          <Button variant="outline" size="sm" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Signature Templates
          </Button>
        </Link>
      </div>
      <SignatureDeliveryPage companyInfo={companyInfo} employees={movementEmployees} />
    </div>
  )
}
