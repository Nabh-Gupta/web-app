import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherByCoords } from '../services/weatherApi';

const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useWeatherUpdates = (initialWeather: WeatherData | null) => {
  const [weather, setWeather] = useState<WeatherData | null>(initialWeather);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setWeather(initialWeather);
  }, [initialWeather]);

  useEffect(() => {
    if (!weather?.coord) return;

    const updateWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherByCoords(weather.coord.lat, weather.coord.lon);
        setWeather(data);
        setError('');
      } catch (err) {
        setError('Error updating weather data');
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(updateWeather, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [weather?.coord]);

  return { weather, error, loading };
};