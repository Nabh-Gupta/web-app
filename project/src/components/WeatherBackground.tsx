import React from 'react';
import { getWeatherBackground } from '../utils/weatherBackgrounds';

interface WeatherBackgroundProps {
  weatherCode: string;
  children: React.ReactNode;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode, children }) => {
  const background = getWeatherBackground(weatherCode);

  return (
    <div className="relative min-h-screen">
      {/* Base gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${background.gradient} transition-colors duration-700 ease-in-out`}
      />
      
      {/* Weather pattern image */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${background.pattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
      />
      
      {/* Weather-specific overlay */}
      <div className={`absolute inset-0 ${background.overlay} backdrop-blur-sm transition-colors duration-700 ease-in-out`} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};