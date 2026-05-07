import "./globals.css"
import { SiteHeader } from "@/components/site-header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="brutalist min-h-screen bg-white text-black font-sans antialiased relative">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
