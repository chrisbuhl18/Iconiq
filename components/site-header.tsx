"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { cn } from "@/lib/utils"
import { X, Menu } from "lucide-react"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface SiteHeaderProps {
  transparent?: boolean
  navItems: NavItem[]
  ctaButton?: {
    label: string
    href: string
  }
  logoSize?: "small" | "medium" | "large"
}

export default function SiteHeader({ transparent = false, navItems, ctaButton, logoSize = "medium" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        transparent ? "bg-transparent" : "border-b bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={logoSize} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors",
                  transparent
                    ? "text-english-violet/80 hover:text-english-violet"
                    : "text-gray-700 hover:text-english-violet",
                  item.active && "font-medium text-english-violet",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {ctaButton && (
              <Link href={ctaButton.href}>
                <Button className="bg-black hover:bg-black/90 text-white rounded-full px-6">{ctaButton.label}</Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-2 px-4 rounded-md transition-colors",
                    item.active
                      ? "bg-gray-100 text-english-violet font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-english-violet",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
