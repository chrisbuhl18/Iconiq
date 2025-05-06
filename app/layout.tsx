import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"
import { Inter, Playfair_Display } from "next/font/google"

// Define the Inter font (sans-serif)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Define the Playfair Display font (serif/heading)
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Meta Pixel Code
const MetaPixelScript = () => {
  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1421954795648761');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}

export const metadata: Metadata = {
  title: "Lumio - Animated Email Elements",
  description: "Make your emails memorable with animated avatars and signatures.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://golumio.co",
    title: "Lumio - Animated Email Elements",
    description: "Make your emails memorable with animated avatars and signatures.",
    siteName: "Lumio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumio - Make your emails memorable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumio - Animated Email Elements",
    description: "Make your emails memorable with animated avatars and signatures.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-SF5P78WTLT`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SF5P78WTLT');
          `}
        </Script>

        {/* Hotjar Tracking Code */}
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6376878,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
        {/* Install this snippet AFTER the Tracking code. */}
        <Script id="hotjar-identify" strategy="afterInteractive">
          {`
            var userId = 6376878 || null; // Replace your_user_id with your own if available.
            window.hj('identify', userId, {
              // Add your own custom attributes here. Some EXAMPLES:
              // 'Signed up': '2019—06-20Z', // Signup date in ISO-8601 format.
              // 'Last purchase category': 'Electronics', // Send strings with quotes around them.
              // 'Total purchases': 15, // Send numbers without quotes.
              // 'Last purchase date': '2019-06-20Z', // Send dates in ISO-8601 format.
              // 'Last refund date': null; // Send null when no value exists for a user.
            });
          `}
        </Script>

        {/* Meta Pixel Code */}
        <MetaPixelScript />

        {/* NoScript for Meta Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1421954795648761&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
