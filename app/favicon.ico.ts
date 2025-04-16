import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    // Read the favicon file from the public directory
    const file = await readFile(join(process.cwd(), "public/favicon/favicon-512x512.png"))

    return new Response(file, {
      headers: {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving favicon:", error)
    return new Response("Favicon not found", { status: 404 })
  }
}
