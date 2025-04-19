import Image from "next/image"
import { cn } from "@/lib/utils"

interface GifAvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function GifAvatar({ src, alt, size = "md", className }: GifAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className={cn("rounded-full overflow-hidden relative", sizeClasses[size], className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        unoptimized // Important for GIFs to animate
      />
    </div>
  )
}
