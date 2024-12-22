import React from 'react';
import { MapPin, Loader } from 'lucide-react';

interface CityDropdownProps {
  suggestions: string[];
  loading: boolean;
  onSelect: (city: string) => void;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
  suggestions,
  loading,
  onSelect,
}) => {
  if (loading) {
    return (
      <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
        <div className="flex items-center justify-center py-2 text-gray-500">
          <Loader className="animate-spin mr-2" size={18} />
          <span>Loading suggestions...</span>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
        <div className="px-4 py-2 text-gray-500">No cities found</div>
      </div>
    );
  }

  return (
    <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 max-h-60 overflow-y-auto">
      {suggestions.map((city, index) => (
        <button
          key={index}
          onClick={() => onSelect(city)}
          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 transition-colors"
        >
          <MapPin size={16} className="text-gray-400" />
          <span>{city}</span>
        </button>
      ))}
    </div>
  );
};