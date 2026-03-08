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
    autoSize: false,
    autoMini: false,
    mutex: true,
    backdrop: true,
    lang: navigator.language.toLowerCase(),
    icons: {},
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm text-white rounded-lg transition duration-300 shadow-lg border border-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      {/* Video Player Section */}
      <div className="w-full bg-black shadow-2xl">
        <div className="max-w-[1600px] mx-auto">
          <Player
            option={artPlayerOptions}
            className="w-full aspect-video md:max-h-[85vh] bg-black mx-auto"
          />
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            {/* Movie Information */}
            <div className="w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">{movie.title}</h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700/50">
                  <h3 className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">Release</h3>
                  <p className="text-lg md:text-xl font-medium">{formatReleaseDate(movie.release_date)}</p>
                </div>

                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700/50">
                  <h3 className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">Runtime</h3>
                  <p className="text-lg md:text-xl font-medium">{formatRuntime(movie.runtime)} </p>
                </div>

                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700/50">
                  <h3 className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">Rating</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-lg md:text-xl font-medium">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">/10</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700/50">
                  <h3 className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">Popularity</h3>
                  <p className="text-lg md:text-xl font-medium">{movie.popularity.toFixed(0)}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-400 mb-3 border-l-4 border-blue-600 pl-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-sm font-medium transition-colors hover:bg-blue-600/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-400 mb-3 border-l-4 border-blue-600 pl-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">{movie.overview}</p>
              </div>

              <div className="bg-gray-800/30 p-5 rounded-2xl border border-gray-700/30">
                <h3 className="text-lg font-semibold text-gray-400 mb-4">Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm md:text-base">
                  <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-500">TMDB ID</span>
                    <span className="text-gray-300">{movie.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-500">File Name</span>
                    <span className="text-gray-300 truncate ml-4" title={movie.name}>{movie.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-300">{movie.parent}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-500">Size</span>
                    <span className="text-gray-300">{(movie.size / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                  </div>
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