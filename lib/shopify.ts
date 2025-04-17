/**
 * Shopify API utilities for the Lumio pricing calculator
 */

// Types for Shopify API responses
export interface ShopifyProduct {
  id: string
  title: string
  description: string
  variants: ShopifyVariant[]
  handle: string
}

// Update the ShopifyVariant interface to include selectedOptions
export interface ShopifyVariant {
  id: string
  title: string
  price: string
  available: boolean
  selectedOptions?: Array<{
    name: string
    value: string
  }>
}

export interface CartCreateResponse {
  cartId: string
  checkoutUrl: string
}

/**
 * Fetches products from a specific collection by title
 */
export async function getProductsByCollection(collectionTitle: string): Promise<ShopifyProduct[]> {
  try {
    console.log(`Fetching products from collection: ${collectionTitle}`)

    // Check if we're in a build/server environment without a proper URL
    if (typeof window === "undefined") {
      // We're in a server environment, but we can't make API calls during build
      // Return empty products array to avoid build errors
      console.log("Server environment detected, returning empty products array for build time")
      return []
    } else {
      // We're in a browser environment, use relative URL
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
            title: collectionTitle,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API error (${response.status}):`, errorText)
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response:", data)

      if (data.error) {
        throw new Error(`API error: ${data.error}`)
      }

      if (
        !data.data ||
        !data.data.collections ||
        !data.data.collections.edges ||
        data.data.collections.edges.length === 0
      ) {
        throw new Error("Collection not found or unexpected API response structure")
      }

      const collection = data.data.collections.edges[0].node
      console.log(`Found collection: ${collection.title}`)

      if (!collection.products || !collection.products.edges || collection.products.edges.length === 0) {
        throw new Error(`No products found in collection: ${collection.title}`)
      }

      // Transform the response to a simpler format
      const products = collection.products.edges.map((edge: any) => {
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
            }
          }),
        }
      })

      console.log(`Found ${products.length} products in collection ${collection.title}`)
      return products
    }
  } catch (error) {
    console.error("Error fetching products from collection:", error)
    // Return empty array instead of throwing during build
    if (typeof window === "undefined") {
      console.log("Returning empty products array due to error during build")
      return []
    }
    throw error
  }
}

/**
 * Creates a cart with the selected items
 */
export async function createCart(
  variantId: string,
  quantity = 1,
  customAttributes: Array<{ key: string; value: string }> = [],
  sellingPlanId: string | null = null, // Add this parameter
): Promise<CartCreateResponse> {
  try {
    console.log("Creating cart with:", {
      variantId,
      quantity,
      customAttributes,
      sellingPlanId,
    })

    // Prepare the request body
    const requestBody: any = {
      variantId,
      quantity,
      customAttributes,
    }

    // Add selling plan ID if provided
    if (sellingPlanId) {
      requestBody.sellingPlanId = sellingPlanId
    }

    const response = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("Cart API error response:", errorData)
      const errorMessage = errorData?.error || `API error: ${response.status}`
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log("Cart API response:", data)

    if (data.error) {
      throw new Error(data.error)
    }

    if (!data.cartId || !data.checkoutUrl) {
      throw new Error("Invalid cart response")
    }

    return data
  } catch (error) {
    console.error("Error creating cart:", error)
    throw error
  }
}

// Add a new function to fetch selling plans for a product
export async function getSellingPlansForProduct(productId: string): Promise<any[]> {
  try {
    const response = await fetch("/api/shopify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetSellingPlans($productId: ID!) {
            product(id: $productId) {
              sellingPlanGroups(first: 5) {
                edges {
                  node {
                    name
                    sellingPlans(first: 5) {
                      edges {
                        node {
                          id
                          name
                          description
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
          productId,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    // Extract and return the selling plans
    const sellingPlanGroups = data.data?.product?.sellingPlanGroups?.edges || []
    const allSellingPlans = []

    for (const group of sellingPlanGroups) {
      const plans = group.node.sellingPlans.edges.map((edge: any) => ({
        id: edge.node.id,
        name: edge.node.name,
        description: edge.node.description,
        groupName: group.node.name,
      }))
      allSellingPlans.push(...plans)
    }

    return allSellingPlans
  } catch (error) {
    console.error("Error fetching selling plans:", error)
    return []
  }
}

// Update the helper function to find the 50% deposit selling plan
export function findDepositSellingPlan(sellingPlans: any[]): string | null {
  console.log("Available selling plans:", JSON.stringify(sellingPlans, null, 2))

  // First try to find a selling plan that contains the specific identifier "3226403001"
  const depositPlan = sellingPlans.find(
    (plan) =>
      plan.id.includes("3226403001") ||
      (plan.name && plan.name.includes("3226403001")) ||
      (plan.description && plan.description.includes("3226403001")),
  )

  // If we found a plan, return its ID
  if (depositPlan) {
    console.log("Found deposit plan:", depositPlan)
    return depositPlan.id
  }

  // If no plan with the specific identifier is found, log a warning and return the hardcoded ID
  console.warn("No selling plan with identifier '3226403001' found in API response. Using hardcoded ID.")

  // Return the hardcoded selling plan ID that we know works
  return "3226403001"
}

/**
 * Fetches all animation packages products and their variants
 */
export async function getAnimationPackages() {
  try {
    const response = await fetch("/api/shopify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetProducts {
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
                        price {
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
        `,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response from API:", errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    if (!data.data || !data.data.products || !data.data.products.edges) {
      throw new Error("Unexpected API response structure")
    }

    return data.data.products.edges.map((edge: any) => edge.node)
  } catch (error) {
    console.error("Error fetching animation packages:", error)
    throw error
  }
}

/**
 * Formats Shopify product data for the pricing calculator
 */
export function formatProductsForCalculator(products: any[]) {
  try {
    console.log("Formatting products:", products)

    if (!products || products.length === 0) {
      throw new Error("No products to format")
    }

    // Validate product structure
    for (const product of products) {
      if (!product.variants || !product.variants.edges) {
        console.error("Invalid product structure:", product)
        throw new Error("Product is missing variants data")
      }

      if (product.variants.edges.length === 0) {
        console.error("Product has no variants:", product)
        throw new Error("Product has no variants")
      }
    }

    // Map products to animation packages based on their titles
    const animationPackages = products.map((product) => {
      try {
        // Get the base variant (user count = 1 or first variant if user count not specified)
        const baseVariant =
          product.variants.edges.find((edge: any) =>
            edge.node.selectedOptions.some((option: any) => option.name === "User Count" && option.value === "1"),
          )?.node || product.variants.edges[0].node

        const price = Number.parseFloat(baseVariant.price.amount)

        // Extract package name from product title or use the title directly
        let name = product.title
        if (name.includes("Starter")) name = "Starter"
        else if (name.includes("Essential")) name = "Essential"
        else if (name.includes("Premium")) name = "Premium"

        return {
          id: product.id,
          name,
          description: product.description || `${name} Animation Package`,
          price,
          variants: product.variants.edges.map((edge: any) => edge.node),
        }
      } catch (error) {
        console.error("Error mapping product:", error, product)
        throw new Error(`Failed to map product: ${product.title}`)
      }
    })

    // Sort packages by price (lowest to highest)
    animationPackages.sort((a, b) => a.price - b.price)

    // Extract user count pricing from the first product's variants
    const userCountPricing = {
      id: "user-count",
      name: "User Count",
      description: "Number of users who will use the animation",
      price: 100, // Default per-user price
      multiplier: true,
    }

    // Create a product map for variant lookup
    const productMap = products.reduce((acc: any, product: any) => {
      // Extract package name from product title or use the title directly
      let key = product.title
      if (key.includes("Starter")) key = "Starter"
      else if (key.includes("Essential")) key = "Essential"
      else if (key.includes("Premium")) key = "Premium"

      acc[key] = product
      return acc
    }, {})

    const result = {
      animationPackages,
      userCounts: [userCountPricing],
      productMap,
    }

    console.log("Formatted result:", result)
    return result
  } catch (error) {
    console.error("Error formatting products:", error)
    throw error
  }
}

/**
 * Finds the appropriate variant ID based on animation package and user count
 */
export function findVariantId(productMap: any, packageName: string, userCount: number) {
  try {
    const product = productMap[packageName]
    if (!product) {
      throw new Error(`Product not found for package name: ${packageName}`)
    }

    // For user counts > 50, find the custom quote variant
    if (userCount > 50) {
      const customVariant = product.variants.edges.find(
        (edge: any) =>
          edge.node.title.toLowerCase().includes("custom") ||
          edge.node.selectedOptions.some((option: any) => option.value.toLowerCase().includes("custom")),
      )

      if (!customVariant) {
        throw new Error("Custom variant not found")
      }

      return customVariant.node.id
    }

    // Find the variant matching the user count
    const variant = product.variants.edges.find((edge: any) =>
      edge.node.selectedOptions.some(
        (option: any) => option.name === "User Count" && option.value === userCount.toString(),
      ),
    )

    if (!variant) {
      throw new Error(`Variant not found for user count: ${userCount}`)
    }

    return variant.node.id
  } catch (error) {
    console.error("Error finding variant ID:", error)
    throw error
  }
}

/**
 * Finds the variant ID that matches the user count
 *
 * @param product - The Shopify product containing variants
 * @param userCount - The number of users selected
 * @returns The variant ID that matches the user count, or null if no match is found
 */
export function findVariantForUserCount(product: any, userCount: number): string | null {
  try {
    console.log("Finding variant for user count:", userCount)
    console.log("Product structure:", JSON.stringify(product, null, 2))

    // Check if product has the expected structure
    if (!product || typeof product !== "object") {
      console.error("Invalid product (null or not an object)")
      return null
    }

    // Handle different possible structures for variants
    let variants = []

    if (Array.isArray(product.variants)) {
      // Direct array of variants
      variants = product.variants
      console.log("Using direct variants array, length:", variants.length)
    } else if (product.variants && product.variants.edges && Array.isArray(product.variants.edges)) {
      // GraphQL-style edges structure
      variants = product.variants.edges.map((edge: any) => edge.node)
      console.log("Using variants.edges structure, length:", variants.length)
    } else {
      console.error("No valid variants structure found")
      return null
    }

    // Log all variants for debugging
    console.log(
      "Available variants:",
      variants.map((v: any) => ({
        id: v.id,
        title: v.title,
        selectedOptions: v.selectedOptions,
      })),
    )

    // First, try to find an exact match for the user count
    let matchingVariant = variants.find((variant: any) => {
      // Check if variant has selectedOptions
      if (!variant.selectedOptions || !Array.isArray(variant.selectedOptions)) {
        return false
      }

      return variant.selectedOptions.some(
        (option: any) => option.name === "User Count" && option.value === String(userCount),
      )
    })

    if (matchingVariant) {
      console.log("Found exact match for user count:", userCount)
      return matchingVariant.id
    }

    // If no exact match, try to find a variant with a title that includes the user count
    matchingVariant = variants.find((variant: any) => variant.title && variant.title.includes(`${userCount} User`))

    if (matchingVariant) {
      console.log("Found match by title for user count:", userCount)
      return matchingVariant.id
    }

    // If still no match, use the first variant as a fallback
    if (variants.length > 0) {
      console.log("No match found, using first variant as fallback")
      return variants[0].id
    }

    console.warn(`No variant found for user count: ${userCount}`)
    return null
  } catch (error) {
    console.error("Error finding variant ID for user count:", error)
    // If there's any error, try to return the first variant as a fallback
    try {
      if (product && product.variants) {
        if (Array.isArray(product.variants) && product.variants.length > 0) {
          return product.variants[0].id
        } else if (product.variants.edges && product.variants.edges.length > 0) {
          return product.variants.edges[0].node.id
        }
      }
    } catch (e) {
      console.error("Error in fallback logic:", e)
    }
    return null
  }
}
