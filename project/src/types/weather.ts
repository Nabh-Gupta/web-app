export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface GeocodingResult {
  name: string;
  local_name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}