"use client"

import { useEffect, useRef } from "react"
import lottie from "lottie-web"
import { cn } from "@/lib/utils"

interface LottieAnimationProps {
  src: string | object
  loop?: boolean
  autoplay?: boolean
  className?: string
  width?: string | number
  height?: string | number
  onComplete?: () => void
}

export default function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  className,
  width = "100%",
  height = "100%",
  onComplete,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clean up previous animation if it exists
    if (animationRef.current) {
      animationRef.current.destroy()
    }

    // Initialize the animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData: typeof src === "string" ? undefined : src,
      path: typeof src === "string" ? src : undefined,
    })

    // Add event listeners
    if (onComplete) {
      animationRef.current.addEventListener("complete", onComplete)
    }

    // Clean up function
    return () => {
      if (animationRef.current) {
        if (onComplete) {
          animationRef.current.removeEventListener("complete", onComplete)
        }
        animationRef.current.destroy()
      }
    }
  }, [src, loop, autoplay, onComplete])

  return (
    <div
      ref={containerRef}
      className={cn("lottie-container", className)}
      style={{ width, height }}
      aria-label="Animation"
    />
  )
}
