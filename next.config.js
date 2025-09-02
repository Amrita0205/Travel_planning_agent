/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
}

module.exports = nextConfig
