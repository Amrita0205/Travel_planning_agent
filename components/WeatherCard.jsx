import React from 'react'

export default function WeatherCard({ weather }) {
  if (!weather) return null

  if (weather.error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-3">Weather Unavailable</h3>
        <p className="text-gray-300 text-lg">{weather.error}</p>
      </div>
    )
  }

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('clear')) return '☀️'
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('snow')) return '❄️'
    if (desc.includes('storm')) return '⛈️'
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️'
    return '🌤️'
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">{getWeatherIcon(weather.description)}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{weather.city}</h3>
        <p className="text-gray-300 text-lg capitalize">{weather.description}</p>
      </div>
      
      <div className="text-4xl font-bold text-white mb-8">
        {Math.round(weather.temperature)}°C
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-gray-300 mb-2 text-sm font-medium">Humidity</div>
          <div className="text-white font-bold text-xl">{weather.humidity}%</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-gray-300 mb-2 text-sm font-medium">Wind Speed</div>
          <div className="text-white font-bold text-xl">{weather.windSpeed} m/s</div>
        </div>
      </div>
    </div>
  )
}

