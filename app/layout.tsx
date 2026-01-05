import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Utopia - Transcendendo Realidades",
  description: "Uma landing page moderna e animada com Next.js 14, Tailwind CSS e componentes 3D interativos usando React Three Fiber.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.jpeg' },
      { url: '/icon-192.jpeg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/icon-512.jpeg', sizes: '512x512', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/icon-192.jpeg', sizes: '192x192', type: 'image/jpeg' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
