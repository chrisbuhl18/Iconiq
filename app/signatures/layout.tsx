import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Animated Email Signatures",
  description: "Bring your brand to life with animated email signatures that make a lasting impression.",
  openGraph: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
    url: "/signatures",
  },
  twitter: {
    title: "Animated Email Signatures | Lumio",
    description: "Bring your brand to life with animated email signatures that make a lasting impression.",
  },
}

export default function SignaturesLayout({ children }: { children: ReactNode }) {
  return children
}
