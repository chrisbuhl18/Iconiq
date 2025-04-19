import SignatureDeliveryPage from "@/components/signature-delivery-page"
import { movementEmployees, companyAssets } from "@/data/movement-employees"

export default function MovementDeliveryPage() {
  return (
    <SignatureDeliveryPage
      companyName="Movement.io"
      companyLogo={companyAssets.logo}
      companyColor={companyAssets.brandColor}
      companyBrandedGif={companyAssets.brandedGif}
      employees={movementEmployees}
    />
  )
}
