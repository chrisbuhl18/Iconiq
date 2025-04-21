# Pricing Calculator Documentation

## Overview

The pricing calculator components are critical parts of the Lumio application that directly impact revenue. They handle the selection of products and variants in Shopify and create carts with the correct items.

## Version History

- **v1.0.0**: Initial implementation
- **v1.1.0**: Fixed variant selection to correctly match user count with Shopify variants (2023-04-15)

## Critical Components

### SignaturePricingCalculator

This component handles the pricing and checkout for email signatures. It includes:

- Selection of animation packages (Starter, Essential, Premium)
- User count selection with per-user pricing
- Custom pricing for large teams (>50 users)
- Variant selection based on user count

### AvatarPricingCalculator

This component handles the pricing and checkout for email avatars. It's simpler than the signature calculator since it doesn't include user counts.

## Variant Selection Logic

The most critical part of these components is the variant selection logic in the `findVariantForUserCount` function. This function:

1. Looks for an exact match for the user count
2. If no exact match is found, finds the closest match below the requested count
3. For user counts > 50, looks for a "custom" variant or uses the highest available user count

## Testing

Before making any changes to these components, thorough testing is required:

1. Test with actual Shopify variants
2. Verify that the correct variant is selected for different user counts
3. Verify that the price displayed matches the price in the cart
4. Test edge cases like very high user counts

## Shopify Setup Requirements

For these components to work correctly, the Shopify products must be set up with:

1. Variants for different user counts
2. A "User Count" option for each variant
3. Proper pricing for each variant

## Troubleshooting

If issues occur with variant selection:

1. Check the browser console for error messages
2. Verify that the Shopify API is returning the expected data
3. Check that the variants have the correct "User Count" option
4. Verify that the variant IDs are correct

## DO NOT MODIFY WITHOUT

- Thorough testing with actual Shopify variants
- Understanding the variant selection logic
- Updating the version number and changelog
- Documenting the changes
