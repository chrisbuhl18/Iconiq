/**
 * Shopify API utilities for the Lumio pricing calculator
 */

// Selling plan ID for 50% deposit option - this is REQUIRED
export const DEPOSIT_SELLING_PLAN_ID = "gid://shopify/SellingPlan/3226403001"

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
 * Creates a cart with the selected items
 * IMPORTANT: The selling plan ID is REQUIRED for the 50% deposit functionality
 */
export async function createCart(
  variantId: string,
  quantity = 1,
  customAttributes: Array<{ key: string; value: string }> = [],
  sellingPlanId = DEPOSIT_SELLING_PLAN_ID, // Always use the deposit selling plan
): Promise<CartCreateResponse> {
  try {
    console.log(`Creating cart with variant ID: ${variantId}, quantity: ${quantity}, selling plan ID: ${sellingPlanId}`)

    // Validate selling plan ID format
    if (!sellingPlanId || !sellingPlanId.startsWith("gid://shopify/SellingPlan/")) {
      console.error("Invalid selling plan ID format:", sellingPlanId)
      throw new Error("Invalid selling plan ID format. Must start with 'gid://shopify/SellingPlan/'")
    }

    const response = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId,
        quantity,
        customAttributes,
        sellingPlanId, // Always include the selling plan ID
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Cart API error (${response.status}):`, errorText)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Cart creation response:", data)

    if (data.error) {
      console.error("Cart creation error:", data.error)
      throw new Error(data.error)
    }

    if (!data.cartId || !data.checkoutUrl) {
      console.error("Invalid cart response:", data)
      throw new Error("Invalid cart response")
    }

    return data
  } catch (error) {
    console.error("Error creating cart:", error)
    throw error
  }
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
