"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getAnimationPackages, formatProductsForCalculator, createCart, findVariantId } from "@/lib/shopify"
import type { ReactNode } from "react"

interface PricingOption {
  id: string
  name: string
  description: string
  price: number
  multiplier?: boolean
  max?: number
  customPricing?: boolean
}

interface PricingOptions {
  animationPackages: PricingOption[]
  templateBuilds?: PricingOption[]
  userCounts?: PricingOption[]
  productMap?: any
}

interface PricingCalculatorProps {
  title: string
  description: ReactNode
  options?: PricingOptions
  singleProduct: boolean
}

// Fallback data for when API fails
const FALLBACK_OPTIONS = {
  animationPackages: [
    { id: "starter", name: "Starter", description: "Basic animation package", price: 950 },
    { id: "essential", name: "Essential", description: "Standard animation package", price: 1450 },
    { id: "premium", name: "Premium", description: "Advanced animation package", price: 2000 },
  ],
  userCounts: [
    {
      id: "user-count",
      name: "User Count",
      description: "Number of users who will use the animation",
      price: 100,
      multiplier: true,
    },
  ],
  // Fallback product map for testing
  productMap: {
    Starter: { id: "starter" },
    Essential: { id: "essential" },
    Premium: { id: "premium" },
  },
}

export default function PricingCalculator({
  title,
  description,
  options: initialOptions,
  singleProduct,
}: PricingCalculatorProps) {
  const [options, setOptions] = useState<PricingOptions | null>(initialOptions || null)
  const [loading, setLoading] = useState(!initialOptions)
  const [selectedAnimation, setSelectedAnimation] = useState<string>("")
  const [selectedUserCount, setSelectedUserCount] = useState<string>("")
  const [userCount, setUserCount] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isCustomPricing, setIsCustomPricing] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState<boolean>(false)

  // Fetch product data from Shopify
  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions)
      setSelectedAnimation(initialOptions.animationPackages[0]?.id || "")
      if (initialOptions.userCounts && initialOptions.userCounts.length > 0) {
        setSelectedUserCount(initialOptions.userCounts[0].id)
      }
      setLoading(false)
      return
    }

    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        console.log("Fetching animation packages...")
        const products = await getAnimationPackages()

        if (!products) {
          console.log("No products returned, using fallback data")
          setOptions(FALLBACK_OPTIONS)
          setSelectedAnimation(FALLBACK_OPTIONS.animationPackages[0].id)
          setSelectedUserCount(FALLBACK_OPTIONS.userCounts[0].id)
          setUsingFallback(true)
        } else {
          console.log("Products returned, formatting data")
          try {
            const formattedOptions = formatProductsForCalculator(products)
            if (formattedOptions) {
              console.log("Successfully formatted options")
              setOptions(formattedOptions)
              setSelectedAnimation(formattedOptions.animationPackages[0].id)
              if (formattedOptions.userCounts) {
                setSelectedUserCount(formattedOptions.userCounts[0].id)
              }
            } else {
              throw new Error("Failed to format product data")
            }
          } catch (formatError) {
            console.error("Error formatting products:", formatError)
            setError("Error formatting product data. Using fallback pricing.")
            setOptions(FALLBACK_OPTIONS)
            setSelectedAnimation(FALLBACK_OPTIONS.animationPackages[0].id)
            setSelectedUserCount(FALLBACK_OPTIONS.userCounts[0].id)
            setUsingFallback(true)
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Error loading pricing data. Using fallback pricing.")
        setOptions(FALLBACK_OPTIONS)
        setSelectedAnimation(FALLBACK_OPTIONS.animationPackages[0].id)
        setSelectedUserCount(FALLBACK_OPTIONS.userCounts[0].id)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialOptions])

  // Calculate total price
  useEffect(() => {
    if (!options) return

    let price = 0

    // Add animation package price
    const animationPackage = options.animationPackages.find((p) => p.id === selectedAnimation)
    if (animationPackage) {
      price += animationPackage.price
    }

    // If not a single product, add user count price
    if (!singleProduct && options.userCounts) {
      const userCountOption = options.userCounts.find((p) => p.id === selectedUserCount)
      if (userCountOption) {
        if (userCount > 50) {
          setIsCustomPricing(true)
        } else {
          setIsCustomPricing(false)
          if (userCountOption.multiplier) {
            price += userCountOption.price * userCount
          }
        }
      }
    }

    setTotalPrice(price)
  }, [selectedAnimation, selectedUserCount, userCount, options, singleProduct])

  // Handle "Get Started" button click
  const handleGetStarted = async () => {
    if (!options) return

    setIsSubmitting(true)

    try {
      // Find the selected animation package
      const selectedPackage = options.animationPackages.find((p) => p.id === selectedAnimation)
      if (!selectedPackage) {
        throw new Error("Selected package not found")
      }

      // Check if we're using real Shopify data or fallback data
      if (usingFallback || !options.productMap || !options.productMap[selectedPackage.name]?.variants) {
        // We're using fallback data, show an alert
        alert(
          `This would add the ${selectedPackage.name} package with ${userCount} users to your cart. Total: $${totalPrice}`,
        )
        console.log("Using fallback checkout flow - Shopify API not connected")
        return
      }

      // Find the variant ID based on the selected package and user count
      const variantId = findVariantId(options.productMap, selectedPackage.name, userCount)

      if (!variantId) {
        throw new Error("Variant not found")
      }

      // Create custom attributes for the cart
      const customAttributes = []

      // For custom pricing (user count > 50), add the actual user count as a custom attribute
      if (isCustomPricing) {
        customAttributes.push({
          key: "Actual User Count",
          value: userCount.toString(),
        })
      }

      // Create a cart with the selected variant
      const cart = await createCart(variantId, 1, customAttributes)

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

  if (loading) {
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

  if (!options) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-md text-english-violet mb-4">{title}</h2>
            <div className="text-lg text-gray-700 max-w-2xl mx-auto">{description}</div>
          </div>
          <div className="text-center py-10">
            <p className="text-red-500">Error loading pricing options. Please refresh the page or try again later.</p>
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
            {isCustomPricing ? (
              <h3 className="text-5xl font-bold text-english-violet">Custom Quote</h3>
            ) : (
              <h3 className="text-5xl font-bold text-english-violet">${totalPrice}</h3>
            )}
            <p className="mt-3 text-english-violet/70">All packages include installation and 2 rounds of revision</p>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-1 gap-8">
            {/* Animation Package and User Count in a connected layout */}
            {!singleProduct ? (
              <div className="bg-seasalt p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Animation Package */}
                  <div>
                    <h3 className="text-2xl font-bold text-english-violet mb-6 text-center">Animation Package</h3>
                    <RadioGroup value={selectedAnimation} onValueChange={setSelectedAnimation} className="space-y-4">
                      <div className="space-y-4">
                        {options.animationPackages.map((option) => (
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

                  {/* User Count */}
                  {options.userCounts && (
                    <div>
                      <h3 className="text-2xl font-bold text-english-violet mb-6 text-center">User Count</h3>
                      <RadioGroup value={selectedUserCount} onValueChange={setSelectedUserCount} className="space-y-4">
                        <div className="space-y-4">
                          {options.userCounts.map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                "flex flex-col rounded-xl border p-6 cursor-pointer transition-all h-full",
                                selectedUserCount === option.id
                                  ? "border-english-violet bg-white shadow-md"
                                  : "border-transparent bg-white/50 hover:bg-white hover:shadow-sm",
                              )}
                              onClick={() => {
                                setSelectedUserCount(option.id)
                              }}
                            >
                              <div className="flex items-start mb-4">
                                <RadioGroupItem value={option.id} id={`user-${option.id}`} className="mt-1" />
                                <div className="ml-3 w-full">
                                  <div className="flex items-center justify-between w-full">
                                    <Label htmlFor={`user-${option.id}`} className="font-bold text-lg cursor-pointer">
                                      {option.name}
                                    </Label>
                                    <span className="text-english-violet/70 font-medium text-lg">
                                      ${option.price}/user
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                </div>
                              </div>

                              {selectedUserCount === option.id && (
                                <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                                  {option.multiplier && (
                                    <>
                                      <Label htmlFor="user-count" className="text-sm font-medium block mb-2">
                                        Number of Users
                                      </Label>
                                      <div className="flex items-center space-x-4">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => setUserCount(Math.max(1, userCount - 1))}
                                          className="h-10 w-10 p-0 rounded-md"
                                        >
                                          -
                                        </Button>
                                        <Input
                                          id="user-count"
                                          type="number"
                                          min="1"
                                          max={100}
                                          value={userCount}
                                          onChange={(e) => {
                                            const value = Number.parseInt(e.target.value)
                                            if (!isNaN(value)) {
                                              setUserCount(Math.max(1, value))
                                            }
                                          }}
                                          className="h-10 text-center"
                                        />
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => {
                                            setUserCount(userCount + 1)
                                          }}
                                          className="h-10 w-10 p-0 rounded-md"
                                        >
                                          +
                                        </Button>
                                      </div>
                                      <div className="mt-2 text-right text-sm text-english-violet/70">
                                        {userCount > 50 ? (
                                          <div className="text-center py-2">
                                            <p className="font-medium text-english-violet">Custom Pricing Available</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                              Contact us for a custom quote for your team
                                            </p>
                                          </div>
                                        ) : (
                                          <span>Subtotal: ${option.price * userCount}</span>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Single Product Animation Package */
              <div className="bg-seasalt p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-english-violet mb-6 text-center">Animation Package</h3>
                <RadioGroup value={selectedAnimation} onValueChange={setSelectedAnimation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {options.animationPackages.map((option) => (
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
            )}
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
