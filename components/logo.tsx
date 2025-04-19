import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "small" | "medium" | "large"
  variant?: "pale" | "dark" | "rose" // Added "rose" variant
}

export default function Logo({
  className,
  showText = true,
  size = "medium",
  variant = "pale", // Default to pale variant
}: LogoProps) {
  // Define size mappings for the logo
  const sizes = {
    small: { width: 120, height: 40 },
    medium: { width: 160, height: 53 },
    large: { width: 200, height: 67 },
  }

  const { width, height } = sizes[size]

  // Select the appropriate logo based on variant
  let logoSrc = "/logos/lumio-logo-pale-violet.png" // Default

  if (variant === "dark") {
    logoSrc = "/logos/lumio-logo-dark-violet.png"
  } else if (variant === "rose") {
    logoSrc = "/logos/lumio-logo-rose-pink.png"
  }

  return (
    <div
      className={cn("relative flex items-center", className)}
      style={{ transform: "scale(0.8)", transformOrigin: "left center" }}
    >
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Lumio"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
