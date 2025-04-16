import { fetchFile } from "next/dist/server/lib/fetch-file"

// This function will generate favicon.ico
export async function GET() {
  // Use the original favicon image
  const file = await fetchFile("public/favicon/favicon-512x512.png")

  return new Response(file, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
