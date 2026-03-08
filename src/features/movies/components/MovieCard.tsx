import React from 'react';
import type { Movie } from '../models/IMovie';
import { formatRuntime } from '../utils/CommonFormat';
import { Link } from 'react-router-dom';

// Movie Card Component
interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    // State to track if image has failed to load
    const [imageError, setImageError] = React.useState(false);
    const poster_url = movie.poster_path
        ? `${import.meta.env.VITE_TMDB_URL}${movie.poster_path}`
        : '/placeholder-movie-poster.jpg';
    return (
        <Link to={`/play/${movie.id}`} className="movie-card">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full group">
                <div className="relative aspect-[2/3] w-full overflow-hidden"> {/* Aspect ratio 2:3 for movie posters */}
                    {!imageError ? (
                        <img
                            src={poster_url} // Fallback image
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                            onLoad={() => setImageError(false)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                            <div className="text-center p-4">
                                <div className="text-gray-400 text-xs md:text-sm font-medium">Image unavailable</div>
                            </div>
                        </div>
                    )}
                    {/* Overlay Rating Tag */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-bold text-[10px] md:text-xs">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                </div>
                <div className="p-2 md:p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-sm md:text-lg text-white line-clamp-1 mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">{movie.title}</h3>
                    <p className="text-gray-400 text-[10px] md:text-sm mb-2">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • {formatRuntime(movie.runtime)}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                        {movie.genres?.slice(0, 2).map((genre: string, index: number) => (
                            <span
                                key={index}
                                className="bg-blue-900/30 text-blue-300 text-[9px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full font-medium border border-blue-500/20"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};