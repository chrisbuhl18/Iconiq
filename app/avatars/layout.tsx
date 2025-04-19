import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Animated Email Avatars",
  description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
  openGraph: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
    url: "/avatars",
    images: [
      {
        url: "/og-image-avatars.png",
        width: 1200,
        height: 630,
        alt: "Lumio - Animated Email Avatars",
      },
    ],
  },
  twitter: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
    images: ["/og-image-avatars.png"],
  },
}

export default function AvatarsLayout({ children }: { children: ReactNode }) {
  return children
}
