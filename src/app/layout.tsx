import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './css/browserhome.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Your Homebase",
  description: "The first place you go when you're lost in the browser.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' accent1-bg'}>{children}</body>
    </html>
  )
}
