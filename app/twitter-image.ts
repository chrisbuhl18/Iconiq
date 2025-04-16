import { fetchFile } from "next/dist/server/lib/fetch-file"

export async function GET() {
  // Use the provided Open Graph image for Twitter as well
  const file = await fetchFile("public/og-image.jpeg")

  return new Response(file, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
