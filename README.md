# AI Travel Planner - Next.js Full-Stack Application

A modern, full-stack travel planning application built with Next.js that uses AI to generate personalized travel itineraries, real-time weather data, and flight information.

## Features

- 🌍 **AI-Powered Travel Planning**: Generate personalized itineraries using OpenAI GPT-4
- 🌤️ **Real-time Weather Data**: Get current weather information for destinations
- ✈️ **Flight Information**: View available flights (mock data for demo)
- 💰 **Budget Planning**: AI-generated budget breakdowns
- 📱 **Responsive Design**: Beautiful, mobile-friendly interface
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 via OpenRouter
- **Weather API**: OpenWeatherMap
- **Styling**: Tailwind CSS with custom components

## Prerequisites

Before running this application, you'll need:

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn**
3. **OpenRouter API Key** (for AI features)
4. **OpenWeatherMap API Key** (for weather data)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI/OpenRouter API Key
OPENROUTER_API_KEY=your_openrouter_api_key_here

# OpenWeatherMap API Key
WEATHER_API_KEY=your_openweathermap_api_key_here
```

### 3. Get API Keys

#### OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

#### OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Generate a new API key
5. Copy the key to your `.env.local` file

### 4. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
travel_bot/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   └── travel-plan/   # Main travel planning API
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── FlightCard.jsx     # Flight information display
│   ├── InputForm.jsx      # Travel form
│   ├── ItineraryCard.jsx  # Itinerary display
│   ├── LoadingSpinner.jsx # Loading component
│   └── WeatherCard.jsx    # Weather information display
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md             # This file
```

## How It Works

### Frontend Flow
1. User fills out the travel form with origin, destination, dates, and budget
2. Form data is sent to the `/api/travel-plan` endpoint
3. Loading spinner is shown while processing
4. Results are displayed in organized cards (weather, flights, itinerary)

### Backend Flow
1. API receives travel request
2. Fetches weather data from OpenWeatherMap API
3. Generates mock flight data (replace with real flight API)
4. Sends request to OpenAI GPT-4 via OpenRouter
5. Processes AI response and returns structured data

### AI Integration
- Uses OpenAI GPT-4 model through OpenRouter
- Generates personalized 5-day itineraries
- Provides budget breakdowns
- Offers travel recommendations based on weather and destination

## Customization

### Adding Real Flight Data
Replace the mock flight data in `app/api/travel-plan/route.js` with a real flight API:

```javascript
// Example with a real flight API
async function getFlights(origin, destination, date) {
  const response = await fetch(`https://your-flight-api.com/search?from=${origin}&to=${destination}&date=${date}`)
  const data = await response.json()
  return data.flights
}
```

### Styling
The application uses Tailwind CSS with custom component classes. Modify `app/globals.css` to customize the design:

```css
@layer components {
  .card {
    @apply bg-white rounded-lg shadow-lg p-6 border border-gray-200;
  }
  /* Add your custom styles here */
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in `.env.local`
   - Check that the keys have proper permissions
   - Verify the keys are not expired

2. **Weather Data Not Loading**
   - Check your OpenWeatherMap API key
   - Ensure the city name is valid
   - Check the API rate limits

3. **AI Responses Not Working**
   - Verify your OpenRouter API key
   - Check your account balance/credits
   - Ensure the model is available

4. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the Next.js documentation for framework-specific questions
