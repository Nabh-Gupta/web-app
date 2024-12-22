import { useState, useEffect } from 'react';
import { getCitySuggestions } from '../services/weatherApi';
import { useDebounce } from './useDebounce';

export const useCityAutocomplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const cities = await getCitySuggestions(debouncedQuery);
        setSuggestions(cities);
      } catch (error) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { suggestions, loading };
};