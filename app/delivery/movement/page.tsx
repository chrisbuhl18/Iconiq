import type { Metadata } from "next"
import { SignatureDeliveryPage } from "@/components/signature-delivery-page"
import { movementEmployees } from "@/data/movement-employees"

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
      <SignatureDeliveryPage companyInfo={companyInfo} employees={movementEmployees} />
    </div>
  )
}
