import { fetchFile } from "next/dist/server/lib/fetch-file"

export async function GET() {
  // Use the original favicon image
  const file = await fetchFile("public/favicon/favicon-512x512.png")

  return new Response(file, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
