import React from 'react';
import { Wind, Droplets, Cloud, Compass, Eye, Thermometer } from 'lucide-react';

interface WeatherDetailsProps {
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  feelsLike: number;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  humidity,
  pressure,
  windSpeed,
  windDeg,
  visibility,
  feelsLike,
}) => {
  const getWindDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-white" size={20} />
          <span className="text-white font-medium">Feels Like</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{Math.round(feelsLike)}°C</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Wind className="text-white" size={20} />
          <span className="text-white font-medium">Wind</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{Math.round(windSpeed)} m/s</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Compass className="text-white" size={20} />
          <span className="text-white font-medium">Direction</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{getWindDirection(windDeg)}</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Droplets className="text-white" size={20} />
          <span className="text-white font-medium">Humidity</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{humidity}%</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Cloud className="text-white" size={20} />
          <span className="text-white font-medium">Pressure</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{pressure} hPa</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Eye className="text-white" size={20} />
          <span className="text-white font-medium">Visibility</span>
        </div>
        <p className="text-2xl font-bold text-white mt-2">{(visibility / 1000).toFixed(1)} km</p>
      </div>
    </div>
  );
};