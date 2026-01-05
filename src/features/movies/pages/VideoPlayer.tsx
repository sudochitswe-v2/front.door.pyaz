import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Player from '../components/Player';
import type { IMovieDetail } from '../models/IMovieDetail';
import { getMovieDetails } from '../usecases/GetMovieDetails';
import { formatReleaseDate, formatRuntime } from '../utils/CommonFormat';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data: IMovieDetail = await getMovieDetails.query(id!);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-xl">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-white text-lg">{error || 'Movie not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Construct video URL from env base URL + movie detail parent/name
  const videoUrl = `${import.meta.env.VITE_VIDEO_BASE_URL}/d/${movie.parent}/${movie.name}`;
  const posterUrl = `${import.meta.env.VITE_TMDB_URL}${movie.poster_path}`;

  // ArtPlayer options
  const artPlayerOptions = {
    container: 'artplayer-app',
    url: videoUrl,
    title: movie.title,
    poster: posterUrl,
    volume: 0.5,
    muted: false,
    autoplay: false,
    pip: true,
    fullscreen: true,
    screenshot: true,
    setting: true,
    loop: false,
    flip: true,
    aspectRatio: true,
    playsInline: true,
    autoSize: true,
    autoMini: false,
    mutex: true,
    backdrop: true,
    lang: navigator.language.toLowerCase(),
    icons: {},
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-9999">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      {/* Video Player Section */}
      <div className="w-full">
        <Player
          option={artPlayerOptions}
          style={{ width: '100%', height: '70vh' }}
          className="w-full h-[70vh] max-h-[70vh] bg-black"
        />
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            {/* <div className="md:w-1/3 flex justify-center">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-xs rounded-lg shadow-2xl object-cover"
                />
              )}
            </div> */}

            {/* Movie Information */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4 text-white">{movie.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Release Date</h3>
                  <p className="text-xl">{formatReleaseDate(movie.release_date)}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Runtime</h3>
                  <p className="text-xl">{formatRuntime(movie.runtime)} </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Rating</h3>
                  <p className="text-xl">{movie.vote_average}/10</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Popularity</h3>
                  <p className="text-xl">{movie.popularity.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Additional Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><span className="text-gray-400">ID:</span> {movie.id}</p>
                  <p><span className="text-gray-400">Name:</span> {movie.name}</p>
                  <p><span className="text-gray-400">Parent:</span> {movie.parent}</p>
                  <p><span className="text-gray-400">Is Directory:</span> {movie.is_dir ? 'Yes' : 'No'}</p>
                  <p><span className="text-gray-400">Size:</span> {movie.size} bytes</p>
                  <p><span className="text-gray-400">Keywords:</span> {movie.keywords?.join(', ') || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer