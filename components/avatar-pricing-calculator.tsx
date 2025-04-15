"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { ShopifyProduct } from "@/lib/shopify"
import { createCart } from "@/lib/shopify"

interface PricingOption {
  id: string
  name: string
  description: string
  price: number
}

interface AvatarPricingCalculatorProps {
  title: string
  description: ReactNode
  products: ShopifyProduct[] | null
}

// Fallback data for when API fails
const FALLBACK_OPTIONS = [
  {
    id: "starter",
    name: "Starter",
    description:
      "Pre-designed animation template with your brand colors. Perfect for teams looking for a professional animated presence without custom design work.",
    price: 950,
  },
  {
    id: "essential",
    name: "Essential",
    description:
      "Tailored animation designed specifically for your brand. Includes custom movement patterns and transitions that reflect your brand personality.",
    price: 1450,
  },
  {
    id: "premium",
    name: "Premium",
    description:
      "Fully bespoke animation with advanced effects, multiple elements, and premium transitions. Our highest tier for brands that want to make a lasting impression.",
    price: 1500,
  },
]

export default function AvatarPricingCalculator({ title, description, products }: AvatarPricingCalculatorProps) {
  const [animationPackages, setAnimationPackages] = useState<PricingOption[]>([])
  const [selectedAnimation, setSelectedAnimation] = useState<string>("")
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState<boolean>(false)

  // Process products on component mount
  useEffect(() => {
    if (products && products.length > 0) {
      try {
        // Format products for the calculator
        const formattedPackages = products.map((product) => {
          // Get the base price from the first variant
          const basePrice = product.variants.length > 0 ? Number.parseFloat(product.variants[0].price) : 0

          return {
            id: product.id,
            name: product.title,
            description: product.description,
            price: basePrice,
          }
        })

        setAnimationPackages(formattedPackages)
        setSelectedAnimation(formattedPackages[0].id)
        setTotalPrice(formattedPackages[0].price)
      } catch (error) {
        console.error("Error formatting products:", error)
        setError("Error formatting product data. Using fallback pricing.")
        setAnimationPackages(FALLBACK_OPTIONS)
        setSelectedAnimation(FALLBACK_OPTIONS[0].id)
        setTotalPrice(FALLBACK_OPTIONS[0].price)
        setUsingFallback(true)
      }
    } else {
      console.log("No products provided, using fallback data")
      setAnimationPackages(FALLBACK_OPTIONS)
      setSelectedAnimation(FALLBACK_OPTIONS[0].id)
      setTotalPrice(FALLBACK_OPTIONS[0].price)
      setUsingFallback(true)
    }
  }, [products])

  // Update total price when selected animation changes
  useEffect(() => {
    const selectedPackage = animationPackages.find((p) => p.id === selectedAnimation)
    if (selectedPackage) {
      setTotalPrice(selectedPackage.price)
    }
  }, [selectedAnimation, animationPackages])

  // Handle "Get Started" button click
  const handleGetStarted = async () => {
    setIsSubmitting(true)

    try {
      // Find the selected animation package
      const selectedPackage = animationPackages.find((p) => p.id === selectedAnimation)
      if (!selectedPackage) {
        throw new Error("Selected package not found")
      }

      // If using fallback data, show an alert
      if (usingFallback) {
        alert(`This would add the ${selectedPackage.name} package to your cart. Total: $${totalPrice}`)
        console.log("Using fallback checkout flow - Shopify API not connected")
        return
      }

      // Find the product in the original products array
      const product = products?.find((p) => p.id === selectedAnimation)
      if (!product || product.variants.length === 0) {
        throw new Error("Product or variant not found")
      }

      // Use the first variant ID
      const variantId = product.variants[0].id

      // Create a cart with the selected variant
      const cart = await createCart(variantId, 1)

      if (cart && cart.checkoutUrl) {
        // Redirect to checkout
        window.location.href = cart.checkoutUrl
      } else {
        throw new Error("Failed to create cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("There was an error adding this item to your cart. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (animationPackages.length === 0) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-md text-english-violet mb-4">{title}</h2>
            <div className="text-lg text-gray-700 max-w-2xl mx-auto">{description}</div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-xl text-english-violet">Loading pricing options...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-md text-english-violet mb-4">{title}</h2>
          <div className="text-lg text-gray-700 max-w-2xl mx-auto">{description}</div>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded relative">
              <strong className="font-bold">Note:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Total Price Display */}
          <div className="bg-gradient-to-r from-periwinkle to-misty-rose p-8 rounded-xl mb-12 text-center shadow-md">
            <span className="text-lg text-english-violet/80 block mb-2">Your Total</span>
            <h3 className="text-5xl font-bold text-english-violet">${totalPrice}</h3>
            <p className="mt-3 text-english-violet/70">All packages include installation and 2 rounds of revision</p>
          </div>

          {/* Animation Package Selection */}
          <div className="bg-seasalt p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-english-violet mb-6 text-center">Animation Package</h3>
            <RadioGroup value={selectedAnimation} onValueChange={setSelectedAnimation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {animationPackages.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "flex flex-col rounded-xl border p-6 cursor-pointer transition-all",
                      selectedAnimation === option.id
                        ? "border-english-violet bg-white shadow-md"
                        : "border-transparent bg-white/50 hover:bg-white hover:shadow-sm",
                    )}
                    onClick={() => setSelectedAnimation(option.id)}
                  >
                    <div className="flex items-start mb-4">
                      <RadioGroupItem value={option.id} id={`animation-${option.id}`} className="mt-1" />
                      <div className="ml-3">
                        <Label htmlFor={`animation-${option.id}`} className="font-bold text-lg cursor-pointer">
                          {option.name}
                        </Label>
                        <p className="text-english-violet/70 font-medium text-lg">${option.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 flex-grow">{option.description}</p>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-english-violet hover:bg-english-violet/90 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleGetStarted}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
