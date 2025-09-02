import { useState } from 'react'

export default function ItineraryCard({ itinerary }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!itinerary) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-white mb-3">No Itinerary Available</h3>
        <p className="text-gray-300 text-lg">Travel itinerary is currently unavailable</p>
      </div>
    )
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Budget Breakdown */}
      {itinerary.budget && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-xl font-bold text-white mb-6">Budget Breakdown</h4>
          <div className="space-y-4">
            {/* Main Expenses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Flights</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.flights}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Accommodation</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.accommodation}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Food</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.food}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Activities</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.activities}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Transport</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.transport}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Visa</span>
                  <span className="text-white font-bold text-lg">{itinerary.budget.visa}</span>
                </div>
              </div>
            </div>
            
            {/* Total */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total Cost</span>
                <span className="text-white font-bold text-2xl">{itinerary.budget.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travel Tips */}
      {itinerary.recommendations && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-xl font-bold text-white mb-4">Travel Tips</h4>
          <ul className="space-y-3">
            {itinerary.recommendations.map((tip, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-blue-400 mt-1 text-lg">•</span>
                <span className="text-gray-300 text-base">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderDailyPlan = () => (
    <div className="space-y-6">
      {itinerary.itinerary && Object.entries(itinerary.itinerary).map(([day, data]) => (
        <div key={day} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-xl font-bold text-white mb-4 capitalize">
            {day.replace('day', 'Day ')}
          </h4>
          {data.activities && (
            <ul className="space-y-3">
              {data.activities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1 text-lg">•</span>
                  <span className="text-gray-300 text-base">{activity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Travel Itinerary</h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-8 bg-white/5 rounded-xl p-2 border border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-200 ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-200 ${
            activeTab === 'daily'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Daily Plan
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' ? renderOverview() : renderDailyPlan()}
      </div>
    </div>
  )
}

