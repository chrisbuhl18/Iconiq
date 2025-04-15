import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "small" | "medium" | "large"
}

export default function Logo({ className, showText = true, size = "medium" }: LogoProps) {
  // Define size mappings - adjusted for the proper aspect ratio of the SVG
  const sizes = {
    small: { width: showText ? 120 : 40, height: showText ? 38 : 40 },
    medium: { width: showText ? 160 : 50, height: showText ? 50 : 50 },
    large: { width: showText ? 200 : 60, height: showText ? 63 : 60 },
  }

  const { width, height } = sizes[size]

  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src="/logos/lumio-logo.svg"
        alt="Lumio"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
