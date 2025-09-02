'use client'
import { useState } from 'react'
import InputForm from '../components/InputForm'
import WeatherCard from '../components/WeatherCard'
import FlightCard from '../components/FlightCard'
import ItineraryCard from '../components/ItineraryCard'
import DestinationImages from '../components/DestinationImages'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [travelData, setTravelData] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setShowResults(false)

    try {
      const response = await fetch('/api/travel-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setTravelData(data)
        setShowResults(true)
      }
    } catch (err) {
      setError('Failed to generate travel plan. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setShowResults(false)
    setTravelData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Stars and Comets */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars */}
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        {/* Comets */}
        <div className="comet"></div>
        <div className="comet2"></div>
        <div className="comet3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-12 pb-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            AI Travel Planner
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Plan your perfect trip with AI-powered recommendations, real-time weather, and flight information
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-6xl">
            {!showResults ? (
              <div className="glass-effect rounded-3xl p-8 md:p-12 backdrop-blur-sm max-w-2xl mx-auto">
                <InputForm onSubmit={handleSubmit} loading={loading} />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Results Header */}
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Travel Plan</h2>
                  <button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Plan Another Trip
                  </button>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Weather Card */}
                  <div className="glass-effect rounded-2xl p-6">
                    <WeatherCard weather={travelData.weather} />
                  </div>

                  {/* Flight Card */}
                  <div className="glass-effect rounded-2xl p-6">
                    <FlightCard flights={travelData.flights} />
                  </div>
                </div>

                {/* Destination Images */}
                {travelData.images && (
                  <DestinationImages images={travelData.images} />
                )}

                {/* Itinerary Card */}
                <div className="glass-effect rounded-2xl p-6">
                  <ItineraryCard itinerary={travelData.itinerary} />
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="glass-effect rounded-2xl p-6 border border-red-500 bg-red-900 bg-opacity-20 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
                <p className="text-red-300 mb-4">{error}</p>
                <button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="glass-effect rounded-3xl p-12 text-center max-w-md mx-4">
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
