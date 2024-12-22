import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherDetails } from './WeatherDetails';
import { formatTime } from '../utils/dateUtils';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="w-full max-w-2xl backdrop-blur-sm bg-black/10 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-xl mt-1 text-white/80">
            {weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </p>
        </div>
        <div className="text-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />
          <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
        </div>
      </div>

      <div className="flex justify-between mt-6 bg-white/20 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Sunrise size={24} />
          <div>
            <p className="text-sm opacity-80">Sunrise</p>
            <p className="text-lg font-semibold">{formatTime(weather.sys.sunrise * 1000)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset size={24} />
          <div>
            <p className="text-sm opacity-80">Sunset</p>
            <p className="text-lg font-semibold">{formatTime(weather.sys.sunset * 1000)}</p>
          </div>
        </div>
      </div>

      <WeatherDetails
        humidity={weather.main.humidity}
        pressure={weather.main.pressure}
        windSpeed={weather.wind.speed}
        windDeg={weather.wind.deg}
        visibility={weather.visibility}
        feelsLike={weather.main.feels_like}
      />
    </div>
  );
};