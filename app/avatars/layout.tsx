import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Animated Email Avatars",
  description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
  openGraph: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
    url: "/avatars",
  },
  twitter: {
    title: "Animated Email Avatars | Lumio",
    description: "Add energy and pop when your email lands in your audience's inbox with animated email avatars.",
  },
}

export default function AvatarsLayout({ children }: { children: ReactNode }) {
  return children
}
