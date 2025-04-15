import Image from "next/image"
import { cn } from "@/lib/utils"

interface SignatureHeadshotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function SignatureHeadshot({ size = "md", className }: SignatureHeadshotProps) {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }

  return (
    <div className={cn("rounded-full overflow-hidden", sizeClasses[size], className)}>
      <Image
        src="/animations/sample-email-sig.gif"
        alt="Team member headshot"
        width={128}
        height={128}
        className="w-full h-full object-cover"
        unoptimized // Important for GIFs to animate
      />
    </div>
  )
}
