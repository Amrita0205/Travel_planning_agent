'use client'
import { useState, useEffect } from 'react'

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would typically fetch from your analytics API
    // For now, we'll show a placeholder with instructions
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="glass-effect rounded-2xl p-6 border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6">📊 Analytics Dashboard</h3>
      
      <div className="space-y-6">
        {/* Vercel Analytics */}
        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-white mb-3">🚀 Vercel Analytics</h4>
          <p className="text-gray-300 mb-3">
            Your site is already tracking visitors with Vercel Analytics!
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>✅ Page views tracked</p>
            <p>✅ Unique visitors counted</p>
            <p>✅ Performance metrics monitored</p>
            <p>✅ Real-time data available</p>
          </div>
          <a 
            href="https://vercel.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            View Vercel Dashboard →
          </a>
        </div>

        {/* Google Analytics Option */}
        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-white mb-3">🔍 Google Analytics (Optional)</h4>
          <p className="text-gray-300 mb-3">
            For detailed user behavior insights, add Google Analytics:
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>1. Get GA4 Measurement ID</p>
            <p>2. Add NEXT_PUBLIC_GA_ID to .env.local</p>
            <p>3. Uncomment Google Analytics in layout.js</p>
          </div>
          <a 
            href="https://analytics.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Setup Google Analytics →
          </a>
        </div>

        {/* Custom Events */}
        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-white mb-3">🎯 Custom Event Tracking</h4>
          <p className="text-gray-300 mb-3">
            Your travel searches are being tracked with custom events:
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>✅ Travel search events</p>
            <p>✅ Origin/destination tracking</p>
            <p>✅ Budget range analysis</p>
            <p>✅ Duration preferences</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Check browser console to see event logs
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">📈</div>
            <div className="text-sm text-gray-300">Real-time</div>
            <div className="text-xs text-gray-500">Analytics</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">🔒</div>
            <div className="text-sm text-gray-300">Privacy</div>
            <div className="text-xs text-gray-500">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  )
}
