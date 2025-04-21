import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimationExample {
  src: string
  alt: string
}

interface AnimationExamplesProps {
  examples: AnimationExample[]
  className?: string
}

export default function AnimationExamples({ examples, className }: AnimationExamplesProps) {
  return (
    <div className={cn("mt-4", className)}>
      <p className="text-sm font-medium text-english-violet mb-2">Example animations:</p>
      <div className="flex flex-wrap gap-3 justify-left">
        {examples.map((example, index) => (
          <div key={index} className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 shadow-sm relative">
            <Image
              src={example.src || "/placeholder.svg"}
              alt={example.alt}
              width={40}
              height={40}
              className="w-full h-full object-cover absolute inset-0"
              unoptimized // Important for GIFs to animate
            />
          </div>
        ))}
      </div>
    </div>
  )
}
