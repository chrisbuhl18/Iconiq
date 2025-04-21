import Image from "next/image"
import { cn } from "@/lib/utils"

interface SignatureHeadshotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  scale?: number
}

export default function SignatureHeadshot({ size = "md", className, scale }: SignatureHeadshotProps) {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  return (
    <div
      className={cn("rounded-full overflow-hidden", sizeClasses[size], className)}
      style={scale ? { transform: `scale(${scale})`, transformOrigin: "center" } : undefined}
    >
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
