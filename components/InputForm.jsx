import { useState } from 'react'

export default function InputForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin city is required'
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination city is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date'
      }
    }
    if (formData.budget && formData.budget < 100) {
      newErrors.budget = 'Budget must be at least $100'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Plan Your Trip</h2>
        <p className="text-gray-300 text-lg">
          Tell us about your travel preferences and we'll create a personalized plan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* City Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-semibold text-gray-200 mb-3">
              Origin City *
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
              className={`w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm text-lg ${
                errors.origin ? 'border-red-400' : ''
              }`}
            />
            {errors.origin && (
              <p className="text-red-400 text-sm mt-2">{errors.origin}</p>
            )}
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-semibold text-gray-200 mb-3">
              Destination City *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Paris, France"
              className={`w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm text-lg ${
                errors.destination ? 'border-red-400' : ''
              }`}
            />
            {errors.destination && (
              <p className="text-red-400 text-sm mt-2">{errors.destination}</p>
            )}
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-200 mb-3">
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white backdrop-blur-sm text-lg ${
                errors.startDate ? 'border-red-400' : ''
              }`}
            />
            {errors.startDate && (
              <p className="text-red-400 text-sm mt-2">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-200 mb-3">
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white backdrop-blur-sm text-lg ${
                errors.endDate ? 'border-red-400' : ''
              }`}
            />
            {errors.endDate && (
              <p className="text-red-400 text-sm mt-2">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Budget Input */}
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-gray-200 mb-3">
            Budget (Optional)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="$ e.g., 2000 or 2000"
            className={`w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm text-lg ${
              errors.budget ? 'border-red-400' : ''
            }`}
          />
          <p className="text-gray-400 text-sm mt-2">
            Leave empty for flexible budget planning
          </p>
          {errors.budget && (
            <p className="text-red-400 text-sm mt-2">{errors.budget}</p>
          )}
        </div>

        {/* Planning Tips */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">💡 Planning Tips</h3>
          <ul className="text-gray-300 space-y-2 text-base">
            <li className="flex items-start space-x-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Book flights 2-3 months in advance for better prices</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Consider travel insurance for international trips</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Check visa requirements for your destination</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Pack according to the local weather forecast</span>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Your Plan...</span>
            </div>
          ) : (
            'Generate Travel Plan'
          )}
        </button>
      </form>
    </div>
  )
}

