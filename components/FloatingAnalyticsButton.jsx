'use client'
import Link from 'next/link'

export default function FloatingAnalyticsButton() {
  return (
    <Link
      href="/analytics"
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-900/30 border border-white/10 transition-colors"
      aria-label="View site analytics"
      title="View site analytics"
    >
      <span className="text-xl" aria-hidden>📊</span>
    </Link>
  )
}


