import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../../../components/Pagination';
import type { Movie } from '../models/IMovie';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState<number>(0);

  // Get page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 20; // 2 rows x 6 columns = 12 items per page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;

        const response = await movieService.searchMovies({
          query: searchQuery,
          limit: itemsPerPage,
          offset: offset
        });

        setMovies(response.hits);
        setTotalResults(response.estimatedTotalHits || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query and reset to page 1
    setSearchParams({ query: searchQuery, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: searchQuery, page: newPage.toString() });
  };

  // Calculate pagination details
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-2">
      <div className="w-full px-2">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Movie Library</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-6xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong>Error: </strong> {error}
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {movies.length} of {totalResults} movies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-2">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 sm:mt-8 flex justify-center max-w-6xl mx-auto w-full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};





export default Home;