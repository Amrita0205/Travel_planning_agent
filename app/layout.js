import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'AI Travel Planner - Smart Trip Planning with AI',
  description: 'Plan your perfect trip with AI-powered recommendations. Get personalized itineraries, real-time weather, and flight information all in one place.',
  keywords: 'travel planning, AI travel, trip planner, vacation planner, travel recommendations',
  authors: [{ name: 'AI Travel Planner Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'AI Travel Planner - Smart Trip Planning with AI',
    description: 'Plan your perfect trip with AI-powered recommendations',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Travel Planner - Smart Trip Planning with AI',
    description: 'Plan your perfect trip with AI-powered recommendations',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      </head>
      <body className="min-h-screen gradient-bg antialiased">
        <div className="relative">
          {/* Background decoration */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
