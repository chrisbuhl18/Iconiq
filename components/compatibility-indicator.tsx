import { Check, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface EmailClientProps {
  name: string
  logo: string
  supported: boolean
  className?: string
}

export function EmailClient({ name, logo, supported, className }: EmailClientProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-12 h-12 mb-2 bg-white rounded-lg shadow-sm p-1 flex items-center justify-center">
        <Image src={logo || "/placeholder.svg"} alt={name} width={32} height={32} className="object-contain" />
      </div>
      <div className="text-xs font-medium mb-1">{name}</div>
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full",
          supported ? "bg-green-100" : "bg-red-100",
        )}
      >
        {supported ? <Check className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3 text-red-500" />}
      </div>
    </div>
  )
}

interface CompatibilityIndicatorProps {
  className?: string
}

export default function CompatibilityIndicator({ className }: CompatibilityIndicatorProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <h3 className="text-lg font-medium text-english-violet mb-4">Email Client Compatibility</h3>
      <div className="flex justify-center space-x-8">
        <EmailClient name="Gmail" logo="/placeholder.svg?height=32&width=32&text=G" supported={true} />
        <EmailClient name="Outlook" logo="/placeholder.svg?height=32&width=32&text=O" supported={false} />
        <EmailClient name="Apple Mail" logo="/placeholder.svg?height=32&width=32&text=A" supported={false} />
        <EmailClient name="Yahoo" logo="/placeholder.svg?height=32&width=32&text=Y" supported={false} />
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Animated avatars are currently only supported in Gmail. For other email clients, the first frame will display as
        a static image.
      </p>
    </div>
  )
}
