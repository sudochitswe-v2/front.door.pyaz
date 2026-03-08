import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialValue = '', placeholder = 'Search movies...' }) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);
  const debouncedQuery = useDebounce(searchQuery, 500); // 500ms debounce delay

  // Call the onSearch callback when debounced query changes
  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search immediately when form is submitted
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group flex items-stretch gap-2">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 pr-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 backdrop-blur-md text-white text-base transition-all duration-300 placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/40 transition-all duration-300 active:scale-95 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;