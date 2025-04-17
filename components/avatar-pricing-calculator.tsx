"use client"

/**
 * @component AvatarPricingCalculator
 * @version 1.2.0
 * @description
 * Pricing calculator for email avatars that handles variant selection.
 *
 * CRITICAL COMPONENT: This component directly impacts checkout functionality and revenue.
 * Any changes should be thoroughly tested with actual Shopify variants.
 *
 * @lastModified 2023-04-16
 * @changelog
 * - 1.0.0: Initial implementation
 * - 1.1.0: Updated to match signature pricing calculator improvements
 * - 1.2.0: Updated display title logic to use product ID/handle instead of price ranges
 */

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { ShopifyProduct } from "@/lib/shopify"
import { createCart } from "@/lib/shopify"
// First, import the AnimationExamples component at the top of the file
import AnimationExamples from "@/components/animation-examples"

interface PricingOption {
  id: string
  name: string
  description: string
  price: number
  handle?: string
}

interface AvatarPricingCalculatorProps {
  title: string
  description: ReactNode
  products: ShopifyProduct[] | null
}

export default function AvatarPricingCalculator({
  title,
  description,
  products: initialProducts,
}: AvatarPricingCalculatorProps) {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(initialProducts)
  const [animationPackages, setAnimationPackages] = useState<PricingOption[]>([])
  const [selectedAnimation, setSelectedAnimation] = useState<string>("")
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch products if not provided
  useEffect(() => {
    async function fetchProducts() {
      if (initialProducts) {
        setProducts(initialProducts)
        return
      }

      setLoading(true)
      try {
        // CRITICAL: This GraphQL query must include selectedOptions to properly match variants
        const response = await fetch("/api/shopify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
             query GetProductsByCollection($title: String!) {
               collections(first: 1, query: $title) {
                 edges {
                   node {
                     title
                     products(first: 10) {
                       edges {
                         node {
                           id
                           title
                           description
                           handle
                           variants(first: 10) {
                             edges {
                               node {
                                 id
                                 title
                                 priceV2 {
                                   amount
                                   currencyCode
                                 }
                                 availableForSale
                                 selectedOptions {
                                   name
                                   value
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
             }
           `,
            variables: {
              title: "Email Avatars",
            },
          }),
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (
          !data.data ||
          !data.data.collections ||
          !data.data.collections.edges ||
          data.data.collections.edges.length === 0
        ) {
          throw new Error("Collection not found")
        }

        const collection = data.data.collections.edges[0].node

        if (!collection.products || !collection.products.edges || collection.products.edges.length === 0) {
          throw new Error(`No products found in collection`)
        }

        // Transform the response to a simpler format
        const fetchedProducts = collection.products.edges.map((edge: any) => {
          const product = edge.node
          return {
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            variants: product.variants.edges.map((variantEdge: any) => {
              const variant = variantEdge.node
              return {
                id: variant.id,
                title: variant.title,
                price: variant.priceV2.amount,
                available: variant.availableForSale,
                selectedOptions: variant.selectedOptions,
              }
            }),
          }
        })

        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError(`Error fetching products: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialProducts])

  // Process products when they're available
  useEffect(() => {
    if (!products) return

    try {
      // Format products for the calculator with fixed titles
      const productTitles = ["Starter", "Essential", "Premium"]
      const formattedPackages = products!.map((product, index) => {
        // Get the base price from the first variant
        const basePrice = product.variants.length > 0 ? Number.parseFloat(product.variants[0].price) : 0

        // Use fixed titles instead of Shopify titles
        const fixedTitle = index < productTitles.length ? productTitles[index] : product.title

        return {
          id: product.id,
          name: fixedTitle,
          description: product.description,
          price: basePrice,
          handle: product.handle,
        }
      })

      // Sort packages to ensure correct order: Starter, Essential, Premium
      formattedPackages.sort((a, b) => {
        const order = { Starter: 1, Essential: 2, Premium: 3 }
        return (order[a.name as keyof typeof order] || 99) - (order[b.name as keyof typeof order] || 99)
      })

      setAnimationPackages(formattedPackages)
    } catch (error) {
      console.error("Error processing products:", error)
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }, [products])

  // Update total price when selected animation changes
  useEffect(() => {
    const selectedPackage = animationPackages.find((p) => p.id === selectedAnimation)
    if (selectedPackage) {
      setTotalPrice(selectedPackage.price)
    } else {
      setTotalPrice(0)
    }
  }, [selectedAnimation, animationPackages])

  /**
   * Helper function to determine the display title based on product ID or handle
   *
   * @param option - The pricing option
   * @returns The display title (Starter, Essential, or Premium)
   */
  const getDisplayTitle = (option: PricingOption): string => {
    // Check handle first (most reliable)
    if (option.handle) {
      if (option.handle.includes("starter")) return "Starter"
      if (option.handle.includes("custom")) return "Essential"
      if (option.handle.includes("premium")) return "Premium"
    }

    // Fallback to ID check
    const id = option.id.toLowerCase()
    if (id.includes("starter")) return "Starter"
    if (id.includes("custom") || id.includes("essential")) return "Essential"
    if (id.includes("premium")) return "Premium"

    // Fallback to name
    if (option.name === "Starter" || option.name === "Essential" || option.name === "Premium") {
      return option.name
    }

    // Last resort: determine by price
    if (option.price <= 950) return "Starter"
    if (option.price <= 1499) return "Essential"
    return "Premium"
  }

  /**
   * CRITICAL FUNCTION: Handles the "Get Started" button click
   *
   * This function is responsible for finding the correct variant and creating the cart.
   * It's critical for ensuring the correct product is added to the cart.
   *
   * DO NOT MODIFY without thorough testing with actual Shopify variants.
   */
  const handleGetStarted = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Find the selected animation package
      const selectedPackage = animationPackages.find((p) => p.id === selectedAnimation)
      if (!selectedPackage) {
        throw new Error("Selected package not found")
      }

      // Find the product in the original products array
      const product = products?.find((p) => p.id === selectedAnimation)
      if (!product || product.variants.length === 0) {
        throw new Error("Product or variant not found")
      }

      // Use the first variant ID for avatars (since there's no user count)
      const variantId = product.variants[0].id
      console.log(`Selected variant ID: ${variantId}`)

      // Hardcoded selling plan ID for 50% deposit
      const sellingPlanId = "gid://shopify/SellingPlan/3226403001"

      // Create a cart with the selected variant and selling plan
      const cart = await createCart(variantId, 1, [], sellingPlanId)

      // Redirect to checkout
      window.location.href = cart.checkoutUrl
    } catch (error) {
      console.error("Error adding to cart:", error)
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`)
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
          {/* Animation Package Selection */}
          <div className="bg-seasalt p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-english-violet mb-6 text-center">Animation Package</h3>
            <RadioGroup value={selectedAnimation} onValueChange={setSelectedAnimation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort and map the packages to ensure Starter, Essential, Premium order */}
                {[...animationPackages]
                  .sort((a, b) => {
                    // Order: Starter (1), Essential (2), Premium (3)
                    const order = { Starter: 1, Essential: 2, Premium: 3 }
                    const aType = getDisplayTitle(a)
                    const bType = getDisplayTitle(b)
                    return (order[aType as keyof typeof order] || 99) - (order[bType as keyof typeof order] || 99)
                  })
                  .map((option) => {
                    // Get the display title based on product ID or handle
                    const displayTitle = getDisplayTitle(option)

                    return (
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
                              {displayTitle}
                            </Label>
                            <p className="text-english-violet/70 font-medium text-lg">${option.price}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">{option.description}</p>
                        {displayTitle === "Starter" && (
                          <AnimationExamples
                            examples={[
                              { src: "/animations/examples/starter-flow.gif", alt: "Animated flow" },
                              { src: "/animations/examples/starter-spin.gif", alt: "Animated spin" },
                              { src: "/animations/examples/starter-pulse-spin.gif", alt: "Animated pulse spin" },
                            ]}
                          />
                        )}
                        {displayTitle === "Essential" && (
                          <AnimationExamples
                            examples={[
                              { src: "/animations/examples/essential-b.gif", alt: "Animated B logo" },
                              { src: "/animations/examples/essential-squares.gif", alt: "Animated squares" },
                              { src: "/animations/examples/essential-slip.gif", alt: "Animated Slip logo" },
                            ]}
                          />
                        )}
                        {displayTitle === "Premium" && (
                          <AnimationExamples
                            examples={[
                              { src: "/animations/examples/premium-alter.gif", alt: "Animated Alter logo" },
                              { src: "/animations/examples/premium-melalogic.gif", alt: "Animated Melalogic logo" },
                              { src: "/animations/examples/premium-playpad.gif", alt: "Animated Playpad logo" },
                            ]}
                          />
                        )}
                      </div>
                    )
                  })}
              </div>
            </RadioGroup>
          </div>

          {/* Total Price Display */}
          <div className="bg-gradient-to-r from-periwinkle to-misty-rose p-8 rounded-xl my-12 text-center shadow-md">
            <span className="text-lg text-english-violet/80 block mb-2">Your Total</span>
            {!selectedAnimation ? (
              <h3 className="text-5xl font-bold text-english-violet">Select a Package</h3>
            ) : (
              <>
                <h3 className="text-5xl font-bold text-english-violet mb-3">${totalPrice}</h3>
                <div className="inline-block bg-black/10 rounded-full px-6 py-2 mb-3">
                  <span className="font-medium text-english-violet">
                    50% Deposit: ${Math.round(totalPrice / 2)} today
                  </span>
                </div>
                <p className="text-english-violet/80 mb-6">
                  Remaining 50% will be auto-charged in 20 days or upon project completion.
                </p>
              </>
            )}
            <p className="text-english-violet/70">
              All packages include installation and 2 rounds of revision. If additional revisions are needed, we'll
              provide a personalized quote.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-english-violet hover:bg-english-violet/90 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleGetStarted}
              disabled={isSubmitting || !selectedAnimation}
            >
              {isSubmitting ? "Processing..." : selectedAnimation ? "Get Started" : "Select a Package"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
