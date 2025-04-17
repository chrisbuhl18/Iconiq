import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get environment variables - using server-side variables without NEXT_PUBLIC_prefix
    const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

    // Use the provided endpoint
    const SHOPIFY_API_ENDPOINT =
      process.env.SHOPIFY_API_ENDPOINT || "https://golumio.myshopify.com/api/2023-10/graphql.json"

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

    // Log the request details
    console.log("Cart creation request:", {
      variantId,
      quantity,
      customAttributesCount: customAttributes.length,
      customAttributes,
      sellingPlanId,
    })

    // Add the _spp2-deposit property if it's not already included
    const finalAttributes = [...customAttributes]
    const hasDepositProperty = finalAttributes.some((attr: any) => attr.key === "_spp2-deposit" && attr.value === "1")

    if (sellingPlanId && !hasDepositProperty) {
      console.log("Adding _spp2-deposit property to custom attributes")
      finalAttributes.push({
        key: "_spp2-deposit",
        value: "1",
      })
    }

    // Prepare the cart input
    const cartInput = {
      lines: [
        {
          quantity,
          merchandiseId: variantId,
          attributes: finalAttributes,
          ...(sellingPlanId ? { sellingPlanId } : {}),
        },
      ],
    }

    // Add more detailed logging for the cart input
    console.log("Cart input:", JSON.stringify(cartInput, null, 2))

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
