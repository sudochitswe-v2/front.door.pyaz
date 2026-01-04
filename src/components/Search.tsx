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
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2 max-w-6xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;