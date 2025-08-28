import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AN Fitness - Transform Your Fitness Journey',
  description: 'Premium gym equipment with cutting-edge animations and interactive design. Your ultimate fitness transformation starts here!',
  icons: {
    icon: './favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-black via-gray-900 to-black`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
