import React from 'react'

export default function FlightCard({ flights }) {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-4xl mb-4">✈️</div>
        <h3 className="text-xl font-bold text-white mb-3">No Flights Available</h3>
        <p className="text-gray-300 text-lg">Flight information is currently unavailable</p>
      </div>
    )
  }

  const getAirlineIcon = (airline) => {
    const airlineLower = airline.toLowerCase()
    if (airlineLower.includes('emirates')) return '🛩️'
    if (airlineLower.includes('singapore')) return '✈️'
    if (airlineLower.includes('qatar')) return '🛫'
    if (airlineLower.includes('etihad')) return '🛬'
    if (airlineLower.includes('turkish')) return '✈️'
    if (airlineLower.includes('indi')) return '🛩️'
    if (airlineLower.includes('air india')) return '✈️'
    if (airlineLower.includes('spice')) return '🛫'
    if (airlineLower.includes('vistara')) return '🛬'
    if (airlineLower.includes('goair')) return '✈️'
    return '✈️'
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Available Flights</h3>
      <div className="space-y-6">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200">
            {/* Flight Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{getAirlineIcon(flight.airline)}</span>
                <div>
                  <h4 className="text-xl font-bold text-white">{flight.airline}</h4>
                  <p className="text-gray-300">Flight {flight.flightNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{flight.price}</div>
                <div className="text-gray-300">per person</div>
              </div>
            </div>

            {/* Flight Route */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-gray-300 mb-2 font-medium">Departure</div>
                <div className="text-white font-bold text-lg">{flight.departure}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300 mb-2 font-medium">Duration</div>
                <div className="text-white font-bold text-lg">{flight.duration}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300 mb-2 font-medium">Arrival</div>
                <div className="text-white font-bold text-lg">{flight.arrival}</div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex space-x-6 text-sm text-gray-300">
                <span className="font-medium">Class: {flight.class || 'Economy'}</span>
                <span className="font-medium">Stops: {flight.stops}</span>
                <span className="font-medium">Baggage: {flight.baggage || 'Included'}</span>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Select Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

