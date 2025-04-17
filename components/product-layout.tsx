import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"

interface ProductLayoutProps {
  children: ReactNode
  productType: "avatars" | "signatures"
  bgColor: string
  textColor: string
  logoVariant?: "pale" | "dark" | "rose" // Add this line
}

export default function ProductLayout({
  children,
  productType,
  bgColor,
  textColor,
  logoVariant = "pale", // Add this line with default value
}: ProductLayoutProps) {
  return (
    <div className={cn("min-h-screen", bgColor === "bg-periwinkle" ? "bg-white" : "bg-english-violet/5")}>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - always on the left */}
            <Link href="/" className="flex items-center">
              <Logo size="medium" variant={logoVariant} />
            </Link>

            {/* Desktop-only center navigation */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full p-1 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/avatars">
                <div
                  className={cn(
                    "px-4 py-2 rounded-full transition-all",
                    productType === "avatars" ? "bg-periwinkle text-english-violet font-medium" : "hover:bg-gray-200",
                  )}
                >
                  Avatars
                </div>
              </Link>
              <Link href="/signatures">
                <div
                  className={cn(
                    "px-4 py-2 rounded-full transition-all",
                    productType === "signatures"
                      ? "bg-misty-rose text-english-violet font-medium"
                      : "hover:bg-gray-200",
                  )}
                >
                  Signatures
                </div>
              </Link>
            </div>

            {/* Mobile-only product toggle - right aligned */}
            <div className="md:hidden flex items-center space-x-1 bg-gray-100 rounded-full p-1 mr-2">
              <Link href="/avatars">
                <div
                  className={cn(
                    "px-2 py-1 text-xs rounded-full transition-all",
                    productType === "avatars" ? "bg-periwinkle text-english-violet font-medium" : "hover:bg-gray-200",
                  )}
                >
                  Avatars
                </div>
              </Link>
              <Link href="/signatures">
                <div
                  className={cn(
                    "px-2 py-1 text-xs rounded-full transition-all",
                    productType === "signatures"
                      ? "bg-misty-rose text-english-violet font-medium"
                      : "hover:bg-gray-200",
                  )}
                >
                  Signatures
                </div>
              </Link>
            </div>

            {/* Desktop-only right side elements */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#contact">
                <Button className="bg-black hover:bg-black/90 text-white rounded-full px-6">Contact</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
