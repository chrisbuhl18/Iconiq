"use client"

import LottieAnimation from "./lottie-animation"
import { cn } from "@/lib/utils"

interface AvatarWithLottieProps {
  lottiePath: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function AvatarWithLottie({ lottiePath, className, size = "md" }: AvatarWithLottieProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className={cn("rounded-full overflow-hidden", sizeClasses[size], className)}>
      <LottieAnimation src={lottiePath} loop={true} autoplay={true} />
    </div>
  )
}
