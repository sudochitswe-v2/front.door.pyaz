import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../usecases/SearchMovies';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../../../components/Pagination';
import Search from '../../../components/Search';
import type { Movie } from '../models/IMovie';
import KpLogo from '../components/KpLogo';
import { AVAILABLE_GENRES } from '../../../utils/genres';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState<number>(0);

  // Get page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 20; // 2 rows x 6 columns = 12 items per page

  // Get initial search query from URL params
  const initialSearchQuery = searchParams.get('query') || '';
  const initialGenre = searchParams.get('genre') || '';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;

        const response = await searchMovies.query({
          query: searchQuery,
          limit: itemsPerPage,
          offset: offset,
          genre: selectedGenre
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
  }, [searchQuery, currentPage, selectedGenre]);

  const handleSearch = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    // Update URL with search query and reset to page 1 when search changes
    if (newSearchQuery !== searchParams.get('query')) {
      setSearchParams({ query: newSearchQuery, genre: selectedGenre, page: '1' });
    }
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    // Update URL with genre and reset to page 1 when genre changes
    if (genre !== searchParams.get('genre')) {
      setSearchParams({ query: searchQuery, genre: genre, page: '1' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: searchQuery, page: newPage.toString() });
  };

  // Calculate pagination details
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 py-2">
      <div className="w-full px-2">
        <div className="flex justify-center">
          <KpLogo />
        </div>
        {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-8"></h1> */}

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          {/* Search Component */}
          <div className="flex-grow">
            <Search
              onSearch={handleSearch}
              initialValue={initialSearchQuery}
              placeholder="Search movies..."
            />
          </div>

          {/* Genre Filter Dropdown */}
          <div className="sm:w-48">
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="w-full p-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Genres</option>
              {AVAILABLE_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded relative mb-4">
            <strong>Error: </strong> {error}
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && (
          <>

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