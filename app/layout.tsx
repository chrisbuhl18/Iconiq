import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: {
    default: "Lumio | Animated Email Avatars",
    template: "%s | Lumio",
  },
  description: "Bring your emails to life with animated elements that create memorable brand impressions.",
  keywords: ["email", "animation", "signature", "avatar", "branding", "marketing"],
  authors: [{ name: "Lumio Team" }],
  creator: "Lumio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumio.vercel.app",
    title: "Lumio | Animated Email Avatars",
    description: "Bring your emails to life with animated elements that create memorable brand impressions.",
    siteName: "Lumio",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Lumio | Animated Email Elements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumio | Animated Email Elements",
    description: "Bring your emails to life with animated elements that create memorable brand impressions.",
    creator: "@lumio",
    images: ["/og-image.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    other: [{ url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" }],
  },
  metadataBase: new URL("https://lumio.vercel.app"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'