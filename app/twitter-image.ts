import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    // Read the OG image file from the public directory
    const file = await readFile(join(process.cwd(), "public/og-image.jpeg"))

    return new Response(file, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving Twitter image:", error)
    return new Response("Twitter image not found", { status: 404 })
  }
}
