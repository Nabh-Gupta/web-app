import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';
import { CityDropdown } from './CityDropdown';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { suggestions, loading } = useCityAutocomplete(query);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setQuery(city);
    onSearch(city);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 bg-white/90 backdrop-blur-sm"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </form>

      {isOpen && query.length > 0 && (
        <CityDropdown
          suggestions={suggestions}
          loading={loading}
          onSelect={handleCitySelect}
        />
      )}
    </div>
  );
};