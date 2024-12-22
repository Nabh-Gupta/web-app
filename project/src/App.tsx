import React, { useState } from 'react';
import { MapPin, Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { WeatherBackground } from './components/WeatherBackground';
import { getWeatherByCity, getWeatherByCoords } from './services/weatherApi';
import { WeatherData } from './types/weather';
import { useWeatherUpdates } from './hooks/useWeatherUpdates';

function App() {
  const [initialWeather, setInitialWeather] = useState<WeatherData | null>(null);
  const [searchError, setSearchError] = useState<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const { weather, error: updateError, loading: updateLoading } = useWeatherUpdates(initialWeather);

  const handleSearch = async (city: string) => {
    try {
      setSearchLoading(true);
      setSearchError('');
      const data = await getWeatherByCity(city);
      setInitialWeather(data);
    } catch (err) {
      setSearchError('City not found. Please try again with a more specific location name.');
      setInitialWeather(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setSearchLoading(true);
            setSearchError('');
            const data = await getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setInitialWeather(data);
          } catch (err) {
            setSearchError('Error fetching weather data.');
          } finally {
            setSearchLoading(false);
          }
        },
        () => {
          setSearchError('Unable to get your location. Please check your browser permissions.');
        },
        { 
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setSearchError('Geolocation is not supported by your browser.');
    }
  };

  const isLoading = searchLoading || updateLoading;
  const error = searchError || updateError;

  return (
    <WeatherBackground weatherCode={weather?.weather[0].icon || '01d'}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Cloud className="text-white" size={40} />
              <h1 className="text-4xl font-bold text-white">Weather Forecast</h1>
            </div>
            <p className="text-white/80">Get real-time weather information for any city</p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <SearchBar onSearch={handleSearch} />
            
            <button
              onClick={getCurrentLocation}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-colors"
              disabled={isLoading}
            >
              <MapPin size={20} />
              <span>Use Current Location</span>
            </button>
          </div>

          {isLoading && (
            <div className="text-center text-white bg-black/20 backdrop-blur-sm rounded-lg p-4">
              {updateLoading ? 'Updating weather data...' : 'Loading weather data...'}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm text-red-100 p-4 rounded-lg text-center border border-red-500/20">
              {error}
            </div>
          )}

          {weather && <WeatherCard weather={weather} />}
        </div>
      </div>
    </WeatherBackground>
  );
}

export default App;