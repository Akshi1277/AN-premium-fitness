import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AN Fitness - Transform Your Fitness Journey 🚀',
  description: 'Premium gym equipment with cutting-edge animations and interactive design. Your ultimate fitness transformation starts here!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
