import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaThermometerHalf, FaTint, FaWind, FaSun, FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';

function WeatherReport() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // OpenWeatherMap API key
  const API_KEY = '1635890035cbba097fd5c26c8ea672a1';

  const fetchWeatherData = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError('City not found or error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const getForecastSummary = () => {
    if (!forecast) return null;

    const dailyForecasts = forecast.list.reduce((acc, item) => {
      const date = moment(item.dt * 1000).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = {
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          date: date,
          rain: item.rain ? item.rain['3h'] : 0,
          humidity: item.main.humidity
        };
      }
      return acc;
    }, {});

    return Object.values(dailyForecasts).slice(0, 5);
  };

  return (
    <div className="bg-[#232b3e] backdrop-blur-md rounded-xl p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <FaCloud className="text-blue-400" />
          Agricultural Weather Report
        </h2>
        <p className="text-gray-300">
          Get detailed weather information and farming recommendations for your location 👇
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50"
          />
        </div>
        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <FaCloud />
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Current Weather */}
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Current Weather in {weather.name}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <FaThermometerHalf className="text-4xl text-red-400 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-white mb-1">Temperature</h4>
                <p className="text-2xl text-white">{Math.round(weather.main.temp)}°C</p>
                <p className="text-sm text-gray-300">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              
              <div className="text-center">
                <FaTint className="text-4xl text-blue-400 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-white mb-1">Humidity</h4>
                <p className="text-2xl text-white">{weather.main.humidity}%</p>
                <p className="text-sm text-gray-300">
                  Dew point: {Math.round(weather.main.temp - ((100 - weather.main.humidity)/5))}°C
                </p>
              </div>
              
              <div className="text-center">
                <FaWind className="text-4xl text-green-400 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-white mb-1">Wind</h4>
                <p className="text-2xl text-white">{Math.round(weather.wind.speed * 3.6)} km/h</p>
                <p className="text-sm text-gray-300">
                  Direction: {weather.wind.deg}°
                </p>
              </div>
              
              <div className="text-center">
                <FaSun className="text-4xl text-yellow-400 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-white mb-1">Conditions</h4>
                <p className="text-2xl text-white capitalize">{weather.weather[0].description}</p>
                <p className="text-sm text-gray-300">
                  Pressure: {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {forecast && (
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-4">
                {getForecastSummary().map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-white font-medium mb-2">
                      {moment(day.date).format('ddd')}
                    </p>
                    <FaCloud className="text-3xl text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-white">
                      {Math.round(day.temp_max)}°C
                      <span className="text-gray-400"> / </span>
                      {Math.round(day.temp_min)}°C
                    </p>
                    <p className="text-xs text-gray-300 capitalize">{day.description}</p>
                    {day.rain > 0 && (
                      <p className="text-xs text-blue-300 mt-1">
                        Rain: {day.rain.toFixed(1)}mm
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weather Alerts */}
          {(weather.main.temp > 35 || weather.main.temp < 10 || weather.wind.speed > 20) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 p-6 rounded-lg border border-red-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-2xl text-red-400" />
                <h4 className="text-lg font-semibold text-white">Weather Alerts</h4>
              </div>
              
              <ul className="space-y-2">
                {weather.main.temp > 35 && (
                  <li className="text-red-200">
                    ⚠️ Extreme heat alert: Take measures to protect crops from heat stress
                  </li>
                )}
                {weather.main.temp < 10 && (
                  <li className="text-red-200">
                    ⚠️ Cold weather alert: Protect sensitive crops from frost damage
                  </li>
                )}
                {weather.wind.speed > 20 && (
                  <li className="text-red-200">
                    ⚠️ High wind alert: Secure crops and delay spraying operations
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default WeatherReport;