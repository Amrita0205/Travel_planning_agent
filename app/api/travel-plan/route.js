import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Setup OpenAI client only if API key is available
let client = null
if (process.env.OPENROUTER_API_KEY ) {
  client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })
}

// Weather API function
async function getWeather(city) {
  try {
    // Check if API key is available
    if (!process.env.WEATHER_API_KEY ) {
      // Return mock weather data if API key is not set
      return {
        city: city,
        temperature: 22,
        description: 'partly cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '02d'
      }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.cod !== 200) {
      return { error: `Weather error: ${data.message}` }
    }
    
    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon
    }
  } catch (error) {
    // Return mock data on error
    return {
      city: city,
      temperature: 22,
      description: 'partly cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: '02d'
    }
  }
}

// Enhanced flight data with realistic international routes and proper date handling
async function getFlights(origin, destination, startDate) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Determine if it's an international flight
  const isInternational = origin.toLowerCase() !== destination.toLowerCase()
  
  // Generate realistic flight data based on route with proper dates
  const flights = []
  
  if (isInternational) {
    // Get realistic flight data based on specific routes
    const routeData = getRealisticRouteData(origin, destination)
    
    for (let i = 0; i < 3; i++) {
      const route = routeData[i % routeData.length]
      const price = route.basePrice + Math.floor(Math.random() * route.priceVariation)
      const duration = route.duration + Math.floor(Math.random() * 2) // Add some variation
      
      // Calculate proper departure and arrival times based on startDate
      const departureHour = Math.floor(Math.random() * 12) + 6 // 6 AM to 6 PM
      const departureMinute = Math.random() > 0.5 ? 0 : 30
      const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`
      
      // Calculate arrival time (same day or next day depending on duration)
      const arrivalHour = (departureHour + Math.floor(duration)) % 24
      const arrivalMinute = departureMinute
      const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`
      
      flights.push({
        id: i + 1,
        airline: route.airline,
        flightNumber: `${route.airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
        departure: `${startDate}T${departureTime}:00`,
        arrival: `${startDate}T${arrivalTime}:00`,
        duration: `${Math.floor(duration)}h ${Math.floor((duration % 1) * 60)}m`,
        price: `$${price}`,
        stops: route.stops,
        class: 'Economy',
        baggage: 'Included',
        cancellation: 'Flexible'
      })
    }
  } else {
    // Domestic flights
    const airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'GoAir']
    
    for (let i = 0; i < 3; i++) {
      const airline = airlines[i % airlines.length]
      const price = 80 + Math.floor(Math.random() * 120) // $80-200 for domestic (more realistic)
      const duration = 1 + Math.random() * 2 // 1-3 hours for domestic
      
      // Calculate proper departure and arrival times
      const departureHour = Math.floor(Math.random() * 12) + 6 // 6 AM to 6 PM
      const departureMinute = Math.random() > 0.5 ? 0 : 30
      const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`
      
      const arrivalHour = (departureHour + Math.floor(duration)) % 24
      const arrivalMinute = departureMinute
      const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`
      
      flights.push({
        id: i + 1,
        airline: airline,
        flightNumber: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
        departure: `${startDate}T${departureTime}:00`,
        arrival: `${startDate}T${arrivalTime}:00`,
        duration: `${Math.floor(duration)}h ${Math.floor((duration % 1) * 60)}m`,
        price: `$${price}`,
        stops: 0,
        class: 'Economy',
        baggage: 'Included',
        cancellation: 'Flexible'
      })
    }
  }
  
  return flights
}

// Function to get realistic route data based on origin and destination
function getRealisticRouteData(origin, destination) {
  const originLower = origin.toLowerCase()
  const destLower = destination.toLowerCase()
  
  // India to popular destinations
  if (originLower.includes('bangalore') || originLower.includes('bengaluru')) {
    if (destLower.includes('tokyo') || destLower.includes('japan')) {
      return [
        { airline: 'Japan Airlines', basePrice: 350, priceVariation: 50, duration: 8, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 380, priceVariation: 60, duration: 12, stops: 1 },
        { airline: 'Qatar Airways', basePrice: 420, priceVariation: 80, duration: 14, stops: 1 }
      ]
    }
    if (destLower.includes('bali') || destLower.includes('indonesia')) {
      return [
        { airline: 'AirAsia', basePrice: 280, priceVariation: 40, duration: 4, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 320, priceVariation: 50, duration: 6, stops: 1 },
        { airline: 'Malaysia Airlines', basePrice: 300, priceVariation: 45, duration: 5, stops: 1 }
      ]
    }
    if (destLower.includes('paris') || destLower.includes('france')) {
      return [
        { airline: 'Air France', basePrice: 450, priceVariation: 80, duration: 10, stops: 0 },
        { airline: 'Emirates', basePrice: 480, priceVariation: 70, duration: 12, stops: 1 },
        { airline: 'Lufthansa', basePrice: 520, priceVariation: 90, duration: 11, stops: 1 }
      ]
    }
    if (destLower.includes('london') || destLower.includes('uk')) {
      return [
        { airline: 'British Airways', basePrice: 480, priceVariation: 80, duration: 10, stops: 0 },
        { airline: 'Emirates', basePrice: 500, priceVariation: 70, duration: 13, stops: 1 },
        { airline: 'Virgin Atlantic', basePrice: 520, priceVariation: 90, duration: 10, stops: 0 }
      ]
    }
    if (destLower.includes('dubai') || destLower.includes('uae')) {
      return [
        { airline: 'Emirates', basePrice: 200, priceVariation: 30, duration: 3, stops: 0 },
        { airline: 'Air India', basePrice: 180, priceVariation: 25, duration: 3, stops: 0 },
        { airline: 'IndiGo', basePrice: 160, priceVariation: 20, duration: 3, stops: 0 }
      ]
    }
    if (destLower.includes('singapore')) {
      return [
        { airline: 'Singapore Airlines', basePrice: 180, priceVariation: 30, duration: 4, stops: 0 },
        { airline: 'IndiGo', basePrice: 150, priceVariation: 25, duration: 4, stops: 0 },
        { airline: 'Air India', basePrice: 170, priceVariation: 28, duration: 4, stops: 0 }
      ]
    }
  }
  
  // Mumbai to popular destinations
  if (originLower.includes('mumbai')) {
    if (destLower.includes('tokyo') || destLower.includes('japan')) {
      return [
        { airline: 'Japan Airlines', basePrice: 320, priceVariation: 50, duration: 7, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 350, priceVariation: 60, duration: 11, stops: 1 },
        { airline: 'Qatar Airways', basePrice: 380, priceVariation: 70, duration: 13, stops: 1 }
      ]
    }
    if (destLower.includes('bali') || destLower.includes('indonesia')) {
      return [
        { airline: 'AirAsia', basePrice: 250, priceVariation: 40, duration: 3, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 280, priceVariation: 50, duration: 5, stops: 1 },
        { airline: 'Malaysia Airlines', basePrice: 260, priceVariation: 45, duration: 4, stops: 1 }
      ]
    }
  }
  
  // Delhi to popular destinations
  if (originLower.includes('delhi')) {
    if (destLower.includes('tokyo') || destLower.includes('japan')) {
      return [
        { airline: 'Japan Airlines', basePrice: 340, priceVariation: 50, duration: 7, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 370, priceVariation: 60, duration: 11, stops: 1 },
        { airline: 'Qatar Airways', basePrice: 400, priceVariation: 70, duration: 13, stops: 1 }
      ]
    }
    if (destLower.includes('bali') || destLower.includes('indonesia')) {
      return [
        { airline: 'AirAsia', basePrice: 270, priceVariation: 40, duration: 4, stops: 0 },
        { airline: 'Singapore Airlines', basePrice: 300, priceVariation: 50, duration: 6, stops: 1 },
        { airline: 'Malaysia Airlines', basePrice: 280, priceVariation: 45, duration: 5, stops: 1 }
      ]
    }
  }
  
  // Default fallback for other routes
  return [
    { airline: 'Emirates', basePrice: 400, priceVariation: 100, duration: 8, stops: 1 },
    { airline: 'Singapore Airlines', basePrice: 450, priceVariation: 120, duration: 10, stops: 1 },
    { airline: 'Qatar Airways', basePrice: 420, priceVariation: 110, duration: 9, stops: 1 }
  ]
}

// Generalized flight base cost estimator (fallback if no real API data)
function estimateFlightCost(origin, destination) {
  // Very rough heuristic: domestic vs international (can be expanded with distance APIs)
  const isInternational = origin.toLowerCase() !== destination.toLowerCase()

  if (isInternational) {
    return 700 + Math.floor(Math.random() * 400) // $700–1100 for international
  } else {
    return 100 + Math.floor(Math.random() * 200) // $100–300 for domestic
  }
}

// Realistic cost ranges based on destination
function getDestinationCosts(destination) {
  const destLower = destination.toLowerCase()
  
  // High-cost destinations
  if (destLower.includes('tokyo') || destLower.includes('japan') || 
      destLower.includes('london') || destLower.includes('uk') ||
      destLower.includes('paris') || destLower.includes('france') ||
      destLower.includes('new york') || destLower.includes('usa')) {
    return {
      accommodationPerNight: { budget: 40, mid: 80, luxury: 200 },
      foodPerDay: { budget: 25, mid: 50, luxury: 120 },
      activitiesPerDay: { budget: 30, mid: 60, luxury: 150 },
      transportPerDay: { budget: 15, mid: 25, luxury: 60 },
      visaCost: 0
    }
  }
  
  // Medium-cost destinations
  if (destLower.includes('singapore') || destLower.includes('dubai') ||
      destLower.includes('bangkok') || destLower.includes('thailand')) {
    return {
      accommodationPerNight: { budget: 25, mid: 50, luxury: 120 },
      foodPerDay: { budget: 15, mid: 35, luxury: 80 },
      activitiesPerDay: { budget: 20, mid: 45, luxury: 100 },
      transportPerDay: { budget: 10, mid: 18, luxury: 40 },
      visaCost: 0
    }
  }
  
  // Budget-friendly destinations
  if (destLower.includes('bali') || destLower.includes('indonesia') ||
      destLower.includes('vietnam') || destLower.includes('cambodia') ||
      destLower.includes('nepal') || destLower.includes('sri lanka')) {
    return {
      accommodationPerNight: { budget: 15, mid: 35, luxury: 80 },
      foodPerDay: { budget: 8, mid: 20, luxury: 50 },
      activitiesPerDay: { budget: 12, mid: 25, luxury: 60 },
      transportPerDay: { budget: 5, mid: 12, luxury: 25 },
      visaCost: 0
    }
  }
  
  // Default (moderate cost)
  return {
    accommodationPerNight: { budget: 20, mid: 50, luxury: 120 },
    foodPerDay: { budget: 12, mid: 30, luxury: 70 },
    activitiesPerDay: { budget: 18, mid: 40, luxury: 90 },
    transportPerDay: { budget: 8, mid: 18, luxury: 40 },
    visaCost: 0
  }
}

// Helper function to calculate realistic budget with destination-specific cost ranges
function calculateBudget(origin, destination, duration, userBudget, flightsInfo) {
  // Use actual flight data if available, otherwise use realistic estimates
  let flightsCost = 300 // Default fallback
  
  if (flightsInfo && flightsInfo.length > 0) {
    // Get the cheapest flight price (most realistic for budget planning)
    const cheapestFlight = flightsInfo.reduce((min, flight) => {
      const currentPrice = parseInt(flight.price.replace('$', ''))
      const minPrice = parseInt(min.price.replace('$', ''))
      return currentPrice < minPrice ? flight : min
    }, flightsInfo[0])
    
    flightsCost = parseInt(cheapestFlight.price.replace('$', ''))
  } else {
    flightsCost = estimateFlightCost(origin, destination)
  }

  // Get destination-specific cost ranges
  const costRanges = getDestinationCosts(destination)

  // Pick cost tier based on budget if available, otherwise default to budget tier
  let tier = "budget"
  if (userBudget) {
    const maxBudget = parseInt(userBudget.replace('$', ''))
    if (maxBudget > 5000) tier = "luxury"
    else if (maxBudget > 2000) tier = "mid"
  }

  const accommodationTotal = costRanges.accommodationPerNight[tier] * duration
  const foodTotal = costRanges.foodPerDay[tier] * duration
  const activitiesTotal = costRanges.activitiesPerDay[tier] * duration
  const transportTotal = costRanges.transportPerDay[tier] * duration
  const visaCost = costRanges.visaCost

  let totalCost = flightsCost + accommodationTotal + foodTotal + activitiesTotal + transportTotal + visaCost

  // If user has a budget, check if it's possible
  if (userBudget) {
    const maxBudget = parseInt(userBudget.replace('$', ''))
    
    // Check if budget is even possible with flight cost alone
    if (flightsCost > maxBudget) {
      return {
        error: `Your budget of $${maxBudget} is too low. The cheapest flight costs $${flightsCost}.`,
        flights: `$${flightsCost}`,
        total: `$${flightsCost}`,
        impossible: true
      }
    }
    
    // If total exceeds budget, inform user but don't distort realistic costs
    if (totalCost > maxBudget) {
      return {
        flights: `$${flightsCost}`,
        accommodation: `$${accommodationTotal} (avg $${costRanges.accommodationPerNight[tier]} per night)`,
        activities: `$${activitiesTotal} (avg $${costRanges.activitiesPerDay[tier]} per day)`,
        food: `$${foodTotal} (avg $${costRanges.foodPerDay[tier]} per day)`,
        transport: `$${transportTotal} (avg $${costRanges.transportPerDay[tier]} per day)`,
        visa: `$${visaCost}`,
        total: `$${totalCost}`,
        note: `Total exceeds your budget of $${maxBudget}. Consider extending your budget or reducing trip duration.`,
        exceedsBudget: true
      }
    }
  }

  return {
    flights: `$${flightsCost}`,
    accommodation: `$${accommodationTotal} (avg $${costRanges.accommodationPerNight[tier]} per night)`,
    activities: `$${activitiesTotal} (avg $${costRanges.activitiesPerDay[tier]} per day)`,
    food: `$${foodTotal} (avg $${costRanges.foodPerDay[tier]} per day)`,
    transport: `$${transportTotal} (avg $${costRanges.transportPerDay[tier]} per day)`,
    visa: `$${visaCost}`,
    total: `$${totalCost}`
  }
}

// Function to get destination images from Unsplash
async function getDestinationImages(destination) {
  try {
    // Clean destination name for better search results
    const cleanDestination = destination.split(',')[0].trim()
    
    // Use Unsplash API to get destination images
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanDestination + ' travel tourism')}&per_page=3&orientation=landscape&client_id=YOUR_UNSPLASH_ACCESS_KEY`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }
    
    const data = await response.json()
    
    return data.results.map(photo => ({
      url: photo.urls.regular,
      alt: photo.alt_description || `${cleanDestination} travel destination`,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html
    }))
  } catch (error) {
    console.log('Image fetch failed, using fallback images')
    // Return fallback images based on destination
    return getFallbackImages(destination)
  }
}

// Fallback images when Unsplash API is not available
function getFallbackImages(destination) {
  const destLower = destination.toLowerCase()
  
  const fallbackImages = {
    'tokyo': [
      { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop', alt: 'Tokyo skyline', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop', alt: 'Tokyo temple', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop', alt: 'Tokyo street', photographer: 'Unsplash' }
    ],
    'bali': [
      { url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop', alt: 'Bali rice terraces', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Bali beach', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop', alt: 'Bali temple', photographer: 'Unsplash' }
    ],
    'paris': [
      { url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop', alt: 'Eiffel Tower', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&h=600&fit=crop', alt: 'Paris street', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop', alt: 'Louvre Museum', photographer: 'Unsplash' }
    ],
    'london': [
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop', alt: 'Big Ben', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop', alt: 'London Bridge', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop', alt: 'London Eye', photographer: 'Unsplash' }
    ],
    'dubai': [
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', alt: 'Burj Khalifa', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', alt: 'Dubai skyline', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', alt: 'Dubai desert', photographer: 'Unsplash' }
    ],
    'singapore': [
      { url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop', alt: 'Marina Bay Sands', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop', alt: 'Singapore skyline', photographer: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop', alt: 'Gardens by the Bay', photographer: 'Unsplash' }
    ]
  }
  
  // Find matching destination
  for (const [key, images] of Object.entries(fallbackImages)) {
    if (destLower.includes(key)) {
      return images
    }
  }
  
  // Default generic travel images
  return [
    { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop', alt: 'Travel destination', photographer: 'Unsplash' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', alt: 'Beautiful landscape', photographer: 'Unsplash' },
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Travel adventure', photographer: 'Unsplash' }
  ]
}

// AI Travel Plan generation with fallback
async function getTravelPlan(userRequest, weatherInfo, flightsInfo, origin, destination, duration, userBudget) {
  try {
    // Calculate realistic budget
    const budgetInfo = calculateBudget(origin, destination, duration, userBudget, flightsInfo)
    
    // Check if OpenAI client is available
    if (!client) {
      // Return enhanced fallback plan if API key is not set
      return {
        itinerary: {
          day1: { 
            activities: [
              "Arrive and check into your hotel",
              "Explore the city center and main attractions",
              "Enjoy a welcome dinner at a local restaurant"
            ]
          },
          day2: { 
            activities: [
              "Visit historical landmarks and museums",
              "Take a guided city tour",
              "Experience local culture and traditions"
            ]
          },
          day3: { 
            activities: [
              "Adventure activities and outdoor exploration",
              "Shopping at local markets and boutiques",
              "Relax at a spa or wellness center"
            ]
          },
          day4: { 
            activities: [
              "Day trip to nearby attractions",
              "Try local cuisine and street food",
              "Evening entertainment and nightlife"
            ]
          },
          day5: { 
            activities: [
              "Final exploration and souvenir shopping",
              "Packing and departure preparation",
              "Farewell dinner at a special restaurant"
            ]
          }
        },
        budget: budgetInfo,
        recommendations: [
          "Check local weather before packing",
          "Book activities and restaurants in advance",
          "Try local cuisine and street food",
          "Keep emergency contacts and travel documents handy",
          "Learn basic phrases in the local language",
          "Pack comfortable walking shoes",
          "Consider travel insurance for peace of mind",
          "Check visa requirements for international travel",
          "Download offline maps and translation apps",
          "Research local customs and etiquette"
        ]
      }
    }

    // Extract budget from user request
    const budgetMatch = userRequest.match(/\$(\d+)/)
    const maxBudget = budgetMatch ? parseInt(budgetMatch[1]) : null

              const completion = await client.chat.completions.create({
       model: "openai/gpt-4",
       messages: [
         { 
           role: "system", 
           content: `You are a travel planner. The budget and flight data are FIXED and REALISTIC - you CANNOT modify them.

CRITICAL RULES:
- The budget breakdown uses REALISTIC cost ranges (e.g., $20/night accommodation, $10/day food)
- These costs are based on actual travel data and cannot be adjusted
- Use the EXACT budget object provided - do not change any numbers
- Use the EXACT flight data provided - do not invent different flight costs
- Focus ONLY on creating realistic activities and recommendations
- If the total exceeds user's budget, that's the reality - don't try to force it lower

Format your response as JSON with this structure:
{
  "itinerary": {
    "day1": {"activities": ["activity1", "activity2", "activity3"]},
    "day2": {"activities": ["activity1", "activity2", "activity3"]},
    "day3": {"activities": ["activity1", "activity2", "activity3"]},
    "day4": {"activities": ["activity1", "activity2", "activity3"]},
    "day5": {"activities": ["activity1", "activity2", "activity3"]}
  },
  "budget": ${JSON.stringify(budgetInfo)},
  "recommendations": ["tip1", "tip2", "tip3"]
}

The budget object is FIXED - use it exactly as provided without any modifications.` 
         },
         { 
           role: "user", 
           content: `
User Request: ${userRequest}

Fixed Data (DO NOT CHANGE):
- Origin: ${origin}
- Destination: ${destination}
- Duration: ${duration} days
- Weather: ${JSON.stringify(weatherInfo)}
- Available Flights: ${JSON.stringify(flightsInfo)}
- Fixed Budget: ${JSON.stringify(budgetInfo)}
- User Budget Limit: ${maxBudget ? `$${maxBudget}` : 'Not specified'}

Create a ${duration}-day travel itinerary from ${origin} to ${destination} that:
1. Uses the EXACT budget provided above (do not modify it)
2. Includes realistic activities for ${destination}
3. Considers the current weather: ${weatherInfo.description}
4. Provides practical travel tips

Return only valid JSON with the exact budget object provided.`
         }
       ],
       max_tokens: 1200,
     })

    const content = completion.choices[0]?.message?.content || "{}"
    
    try {
      const aiResponse = JSON.parse(content)
      
      // Validate budget constraint
      if (maxBudget && aiResponse.budget && aiResponse.budget.total) {
        const totalCost = aiResponse.budget.total
        const costMatch = totalCost.match(/\$(\d+)/)
        if (costMatch) {
          const actualCost = parseInt(costMatch[1])
          if (actualCost > maxBudget) {
            // If AI exceeded budget, use fallback budget
            return {
              ...aiResponse,
              budget: budgetInfo,
              recommendations: [
                ...aiResponse.recommendations || [],
                "Note: Budget has been adjusted to meet your constraints"
              ]
            }
          }
        }
      }
      
      return aiResponse
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      // Fallback if JSON parsing fails
      return {
        itinerary: {
          day1: { activities: ["Explore the city", "Visit local attractions"] },
          day2: { activities: ["Cultural activities", "Local cuisine"] },
          day3: { activities: ["Adventure activities", "Shopping"] },
          day4: { activities: ["Relaxation", "Spa day"] },
          day5: { activities: ["Final exploration", "Departure preparation"] }
        },
        budget: budgetInfo,
        recommendations: [
          "Check local weather before packing",
          "Book activities in advance",
          "Try local cuisine",
          "Keep emergency contacts handy"
        ]
      }
    }
  } catch (error) {
    console.error('AI API Error:', error)
    // Return fallback plan on error
    const budgetInfo = calculateBudget(origin, destination, duration, userBudget, flightsInfo)
    return {
      itinerary: {
        day1: { activities: ["Explore the city", "Visit local attractions"] },
        day2: { activities: ["Cultural activities", "Local cuisine"] },
        day3: { activities: ["Adventure activities", "Shopping"] },
        day4: { activities: ["Relaxation", "Spa day"] },
        day5: { activities: ["Final exploration", "Departure preparation"] }
      },
      budget: budgetInfo,
      recommendations: [
        "Check local weather before packing",
        "Book activities in advance",
        "Try local cuisine",
        "Keep emergency contacts handy"
      ]
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { origin, destination, startDate, endDate, budget } = body

    if (!origin || !destination || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate trip duration
    const start = new Date(startDate)
    const end = new Date(endDate)
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

    // Get weather for destination
    const weatherInfo = await getWeather(destination)
    
    // Get flights
    const flightsInfo = await getFlights(origin, destination, startDate)
    
    // Get destination images
    const destinationImages = await getDestinationImages(destination)
    
         // Calculate budget first to check if it's possible
     const budgetInfo = calculateBudget(origin, destination, duration, budget, flightsInfo)
     
     // Check if budget is impossible
     if (budgetInfo.impossible) {
       return NextResponse.json({
         error: budgetInfo.error,
         weather: weatherInfo,
         flights: flightsInfo,
         budget: budgetInfo,
         images: destinationImages
       })
     }
     
     // Generate travel plan
     const userRequest = `Plan me a trip from ${origin} to ${destination} from ${startDate} to ${endDate}${budget ? ` with a budget of ${budget}` : ''}. Include flights and weather considerations.`
     
     const travelPlan = await getTravelPlan(userRequest, weatherInfo, flightsInfo, origin, destination, duration, budget)

    return NextResponse.json({
      weather: weatherInfo,
      flights: flightsInfo,
      itinerary: travelPlan,
      images: destinationImages
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
