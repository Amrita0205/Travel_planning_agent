import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 w-12 h-12 border-4 border-white/10 border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center Dot */}
        <div className="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1 -translate-y-1 animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <div className="text-white font-semibold mb-2">Creating Your Travel Plan</div>
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
