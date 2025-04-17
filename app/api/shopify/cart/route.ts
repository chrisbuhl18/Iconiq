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

    // Get the cart details from the request body
    const { variantId, quantity = 1, customAttributes = [], sellingPlanId } = await request.json()

    // Validate required fields
    if (!variantId) {
      return NextResponse.json({ error: "Variant ID is required" }, { status: 400 })
    }

    // Validate selling plan ID - it's REQUIRED for the 50% deposit functionality
    if (!sellingPlanId || !sellingPlanId.startsWith("gid://shopify/SellingPlan/")) {
      console.error("Invalid or missing selling plan ID:", sellingPlanId)
      return NextResponse.json(
        { error: "Selling plan ID is required and must be in the correct format" },
        { status: 400 },
      )
    }

    console.log("Cart creation request:", {
      variantId,
      quantity,
      customAttributesCount: customAttributes.length,
      sellingPlanId,
    })

    // Prepare the cart input with the selling plan ID
    const cartInput = {
      lines: [
        {
          quantity,
          merchandiseId: variantId,
          attributes: customAttributes,
          sellingPlanId: sellingPlanId, // Always include the selling plan ID
        },
      ],
    }

    // Add more detailed logging for the cart input and custom attributes
    console.log("Cart input:", JSON.stringify(cartInput, null, 2))
    console.log("Custom attributes:", JSON.stringify(customAttributes, null, 2))
    console.log("Selling plan ID:", sellingPlanId)

    // Check if _spp2-deposit property is included
    const hasDepositProperty = customAttributes.some((attr: any) => attr.key === "_spp2-deposit" && attr.value === "1")
    if (!hasDepositProperty) {
      console.warn(
        "_spp2-deposit property not found in custom attributes. This may be required for 50% deposit to work correctly.",
      )
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
          input: cartInput,
        },
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

    // Parse the response
    const data = await response.json()
    console.log("Shopify cart creation response:", JSON.stringify(data, null, 2))

    // Check for errors
    if (data.errors) {
      console.error("Shopify cart creation GraphQL errors:", data.errors)
      return NextResponse.json({ error: "Shopify GraphQL errors", details: data.errors }, { status: 400 })
    }

    if (data.data?.cartCreate?.userErrors?.length > 0) {
      console.error("Shopify cart user errors:", data.data.cartCreate.userErrors)
      return NextResponse.json(
        { error: "Cart creation errors", details: data.data.cartCreate.userErrors },
        { status: 400 },
      )
    }

    // Validate cart data
    if (!data.data?.cartCreate?.cart?.id || !data.data?.cartCreate?.cart?.checkoutUrl) {
      console.error("Invalid cart response from Shopify:", data)
      return NextResponse.json({ error: "Invalid cart response from Shopify" }, { status: 500 })
    }

    // Return the cart data
    return NextResponse.json({
      cartId: data.data.cartCreate.cart.id,
      checkoutUrl: data.data.cartCreate.cart.checkoutUrl,
    })
  } catch (error) {
    console.error("Shopify cart API error:", error)
    return NextResponse.json(
      { error: "An error occurred while creating the cart", details: String(error) },
      { status: 500 },
    )
  }
}
