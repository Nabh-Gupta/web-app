interface WeatherBackground {
  gradient: string;
  pattern: string;
  overlay: string;
}

// Map weather conditions to time of day
const isNightTime = (icon: string): boolean => icon.endsWith('n');

export const getWeatherBackground = (weatherCode: string): WeatherBackground => {
  const backgrounds: Record<string, WeatherBackground> = {
    // Clear sky
    '01d': {
      gradient: 'from-sky-400 via-blue-400 to-blue-500',
      pattern: 'https://images.unsplash.com/photo-1517483000871-1dbf3a8e03f3?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-blue-500/10'
    },
    '01n': {
      gradient: 'from-gray-900 via-blue-900 to-black',
      pattern: 'https://images.unsplash.com/photo-1532978379173-523e16f371f4?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/40'
    },
    // Few clouds
    '02d': {
      gradient: 'from-blue-400 via-blue-300 to-sky-300',
      pattern: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-blue-400/20'
    },
    '02n': {
      gradient: 'from-slate-800 via-gray-900 to-slate-900',
      pattern: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/50'
    },
    // Scattered/broken clouds
    '03d': {
      gradient: 'from-blue-300 via-gray-400 to-blue-400',
      pattern: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-gray-400/30'
    },
    '03n': {
      gradient: 'from-slate-900 via-gray-800 to-slate-800',
      pattern: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/60'
    },
    // Rain
    '09d': {
      gradient: 'from-gray-600 via-blue-700 to-gray-700',
      pattern: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-blue-900/40'
    },
    '09n': {
      gradient: 'from-gray-900 via-blue-900 to-black',
      pattern: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/70'
    },
    // Thunderstorm
    '11d': {
      gradient: 'from-gray-800 via-purple-900 to-gray-900',
      pattern: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-purple-900/50'
    },
    '11n': {
      gradient: 'from-slate-900 via-purple-900 to-black',
      pattern: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/80'
    },
    // Snow
    '13d': {
      gradient: 'from-blue-100 via-white to-gray-200',
      pattern: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-white/30'
    },
    '13n': {
      gradient: 'from-gray-800 via-blue-900 to-gray-900',
      pattern: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/60'
    },
    // Mist/fog
    '50d': {
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      pattern: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-gray-400/50'
    },
    '50n': {
      gradient: 'from-gray-800 via-gray-900 to-black',
      pattern: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1920&q=80',
      overlay: 'bg-black/70'
    },
  };

  // Default background
  const defaultBackground: WeatherBackground = {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    pattern: 'https://images.unsplash.com/photo-1517483000871-1dbf3a8e03f3?auto=format&fit=crop&w=1920&q=80',
    overlay: 'bg-blue-500/20'
  };

  return backgrounds[weatherCode] || defaultBackground;
};