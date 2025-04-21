import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get environment variables - using server-side variables without NEXT_PUBLIC_prefix
    const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

    // Use the provided endpoint
    const SHOPIFY_API_ENDPOINT = "https://golumio.myshopify.com/api/2023-10/graphql.json"

    // Log environment variable status (without revealing values)
    console.log("Environment variables status:", {
      hasStorefrontToken: !!SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      apiEndpoint: SHOPIFY_API_ENDPOINT,
    })

    // Validate environment variables
    if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      console.error("Shopify access token is missing. Check your environment variables.")
      return NextResponse.json({ error: "Shopify access token is missing" }, { status: 500 })
    }

    // Get the GraphQL query and variables from the request body
    const { query, variables } = await request.json()

    console.log("Making request to Shopify API")
    console.log("Query:", query)
    console.log("Variables:", variables)

    // Make the request to Shopify
    const response = await fetch(SHOPIFY_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response from Shopify API:", errorText)
      return NextResponse.json(
        { error: `Shopify API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    // Try to parse the response as JSON
    try {
      const data = await response.json()

      // Check for GraphQL errors
      if (data.errors) {
        console.error("Shopify GraphQL errors:", data.errors)
        return NextResponse.json({ error: "Shopify GraphQL errors", details: data.errors }, { status: 400 })
      }

      // Return the data
      return NextResponse.json(data)
    } catch (error) {
      console.error("Error parsing Shopify response as JSON:", error)
      return NextResponse.json({ error: "Error parsing Shopify response as JSON" }, { status: 500 })
    }
  } catch (error) {
    console.error("Shopify API error:", error)
    return NextResponse.json({ error: "Shopify API error", details: String(error) }, { status: 500 })
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
      console.error("API returned an error:", data.error)
      throw new Error(data.error)
    }

    if (!data.data || !data.data.products || !data.data.products.edges) {
      console.error("Unexpected API response structure:", data)
      throw new Error("Unexpected API response structure")
    }

    return data.data.products.edges.map((edge: any) => edge.node)
  } catch (error) {
    console.error("Error fetching animation packages:", error)
    throw error
  }
}

/**
 * Creates a cart with the selected items
 */
export async function createCart(variantId: string, quantity = 1, customAttributes: any[] = []) {
  try {
    const response = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId,
        quantity,
        customAttributes,
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

    if (!data.cartId || !data.checkoutUrl) {
      throw new Error("Invalid cart response")
    }

    return {
      cartId: data.cartId,
      checkoutUrl: data.checkoutUrl,
    }
  } catch (error) {
    console.error("Error creating cart:", error)
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
