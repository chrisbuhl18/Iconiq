import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Animated Email Signatures",
  description: "Bring your brand to life with animated email signatures that make a lasting impression.",
  openGraph: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
    url: "/signatures",
    images: [
      {
        url: "/og-image-signatures.png",
        width: 1200,
        height: 630,
        alt: "Lumio - Animated Email Signatures",
      },
    ],
  },
  twitter: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
    images: ["/og-image-signatures.png"],
  },
}

export default function SignaturesLayout({ children }: { children: ReactNode }) {
  return children
}
