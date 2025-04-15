import { NextResponse } from "next/server"

// Get environment variables - using server-side variables without NEXT_PUBLIC_ prefix
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const SHOPIFY_API_ENDPOINT = process.env.SHOPIFY_API_ENDPOINT

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_API_ENDPOINT) {
      return NextResponse.json({ error: "Shopify configuration is missing" }, { status: 500 })
    }

    // Get the cart details from the request body
    const { variantId, quantity = 1, customAttributes = [] } = await request.json()

    // Validate required fields
    if (!variantId) {
      return NextResponse.json({ error: "Variant ID is required" }, { status: 400 })
    }

    // Create a cart using the Shopify Storefront API
    const response = await fetch(SHOPIFY_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            lines: [
              {
                quantity,
                merchandiseId: variantId,
                attributes: customAttributes,
              },
            ],
          },
        },
      }),
    })

    // Parse the response
    const data = await response.json()

    // Check for errors
    if (data.errors) {
      console.error("Shopify cart creation errors:", data.errors)
      return NextResponse.json({ error: data.errors[0].message }, { status: 400 })
    }

    if (data.data?.cartCreate?.userErrors?.length > 0) {
      console.error("Shopify cart user errors:", data.data.cartCreate.userErrors)
      return NextResponse.json({ error: data.data.cartCreate.userErrors[0].message }, { status: 400 })
    }

    // Return the cart data
    return NextResponse.json({
      cartId: data.data.cartCreate.cart.id,
      checkoutUrl: data.data.cartCreate.cart.checkoutUrl,
    })
  } catch (error) {
    console.error("Shopify cart API error:", error)
    return NextResponse.json({ error: "An error occurred while creating the cart" }, { status: 500 })
  }
}
