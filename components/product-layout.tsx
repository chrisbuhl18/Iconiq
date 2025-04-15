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
}

export default function ProductLayout({ children, productType, bgColor, textColor }: ProductLayoutProps) {
  return (
    <div className={cn("min-h-screen", bgColor === "bg-periwinkle" ? "bg-white" : "bg-english-violet/5")}>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo size="medium" />
            </Link>

            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full p-1">
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

            <div className="flex items-center space-x-4">
              <Link href="#contact">
                <Button className="bg-black hover:bg-black/90 text-white rounded-full">Contact</Button>
              </Link>

              {/* Mobile menu button - only visible on small screens */}
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
