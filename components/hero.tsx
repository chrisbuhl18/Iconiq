import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface HeroProps {
  title: ReactNode
  subtitle: ReactNode
  bgColor: string
  textColor: string
  buttonText: string
  buttonLink: string
  image: ReactNode | string
}

export default function Hero({ title, subtitle, bgColor, textColor, buttonText, buttonLink, image }: HeroProps) {
  return (
    <section id="hero" className={cn("relative overflow-hidden", bgColor)}>
      {/* Decorative clouds */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-white rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-champagne rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-[30%] right-[20%] w-40 h-40 bg-white rounded-full opacity-30 blur-3xl"></div>

      {/* Desktop version - only visible on md and up */}
      <div className="hidden md:block py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text content */}
            <div className="md:w-1/2">
              <h1 className={cn("heading-xl mb-6", textColor)}>{title}</h1>
              <div className="text-xl md:text-2xl mb-8 text-gray-700 max-w-xl">{subtitle}</div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href={buttonLink}>
                  <Button className="bg-english-violet hover:bg-english-violet/90 text-white rounded-full px-8 py-6 text-lg">
                    {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#contact">
                  <Button
                    variant="outline"
                    className="border-english-violet text-english-violet rounded-full px-8 py-6 text-lg"
                  >
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Demo/Image */}
            <div className="md:w-1/2">
              {typeof image === "string" ? (
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-full h-full bg-white/30 rounded-2xl transform rotate-2"></div>
                  <div className="absolute -top-5 -left-5 w-full h-full bg-white/50 rounded-2xl transform rotate-1"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 z-10 flex items-center justify-center h-[400px]">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt="Product preview"
                      width={500}
                      height={300}
                      className="object-contain max-h-full"
                    />
                  </div>
                </div>
              ) : (
                image
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version - only visible below md */}
      <div className="md:hidden py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center gap-8">
            {/* Text content */}
            <div className="text-center">
              <h1 className={cn("text-4xl font-bold font-heading leading-tight mb-4", textColor)}>{title}</h1>
              <div className="text-lg mb-6 text-gray-700">{subtitle}</div>

              <div className="flex flex-col items-center gap-3">
                <a href={buttonLink}>
                  <Button className="bg-english-violet hover:bg-english-violet/90 text-white rounded-full px-6 py-4 text-base">
                    {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#contact">
                  <Button
                    variant="outline"
                    className="border-english-violet text-english-violet rounded-full px-6 py-4 text-base"
                  >
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Demo/Image - scaled down for mobile */}
            <div className="w-full max-w-[320px] mx-auto">
              {typeof image === "string" ? (
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-full h-full bg-white/30 rounded-xl transform rotate-2"></div>
                  <div className="absolute -top-3 -left-3 w-full h-full bg-white/50 rounded-xl transform rotate-1"></div>
                  <div className="relative bg-white rounded-xl shadow-lg p-4 z-10 flex items-center justify-center h-[260px]">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt="Product preview"
                      width={250}
                      height={200}
                      className="object-contain max-h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="transform-gpu">{image}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
