"use client"

import LottieAnimation from "./lottie-animation"
import { cn } from "@/lib/utils"
// You would need to import your Lottie JSON file
// import animationData from '@/public/animations/your-animation.json'

interface BrandAvatarProps {
  animationData: any
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function BrandAvatar({ animationData, className, size = "md" }: BrandAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className={cn("rounded-full overflow-hidden", sizeClasses[size], className)}>
      <LottieAnimation src={animationData} loop={true} autoplay={true} />
    </div>
  )
}
