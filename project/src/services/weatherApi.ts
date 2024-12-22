import axios from 'axios';
import { WeatherData, GeocodingResult } from '../types/weather';

const API_KEY = '549eb3a94e257a271926afaf18e69d42';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  // First get precise coordinates for the city
  const locations = await getCityCoordinates(city);
  if (locations.length === 0) {
    throw new Error('City not found');
  }
  
  // Use the most relevant result
  const location = locations[0];
  return getWeatherByCoords(location.lat, location.lon);
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};

export const getCityCoordinates = async (query: string): Promise<GeocodingResult[]> => {
  const response = await axios.get(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  
  return response.data.map((item: any) => ({
    name: item.name,
    local_name: item.local_names?.en || item.name,
    lat: item.lat,
    lon: item.lon,
    country: item.country,
    state: item.state
  }));
};

export const getCitySuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 2) return [];
  
  const locations = await getCityCoordinates(query);
  
  return locations.map(location => {
    const parts = [location.name];
    if (location.state) parts.push(location.state);
    parts.push(location.country);
    return parts.join(', ');
  });
};