import React from 'react';
import type { Movie } from '../models/IMovie';
import { formatRuntime } from '../utils/CommonFormat';
import { useNavigate } from 'react-router-dom';

// Movie Card Component
interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const navigate = useNavigate();



    const onCardClick = () => navigate(`/play/${movie.id}`);

    // State to track if image has failed to load
    const [imageError, setImageError] = React.useState(false);
    const poster_url = movie.poster_path
        ? `${import.meta.env.VITE_TMDB_URL}${movie.poster_path}`
        : '/placeholder-movie-poster.jpg';
    return (
        <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group" onClick={onCardClick}>
            <div className="relative aspect-[2/3] w-full overflow-hidden"> {/* Aspect ratio 2:3 for movie posters */}
                {!imageError ? (
                    <img
                        src={poster_url} // Fallback image
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        onLoad={() => setImageError(false)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <div className="text-center p-4">
                            <div className="text-gray-400 text-md font-medium">image unavliable</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-white line-clamp-1 mb-1">{movie.title}</h3>
                <p className="text-gray-300 text-sm mb-2">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • {formatRuntime(movie.runtime)}
                </p>
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-300 font-medium text-sm">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.slice(0, 2).map((genre: string, index: number) => (
                        <span
                            key={index}
                            className="bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full font-medium"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
                {/* <div className="flex justify-between items-center gap-2 mt-auto">
                    <button
                        onClick={() => handleViewDetails(movie.id)}
                        className="flex-1 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-3 py-2 text-center transition-colors"
                    >
                        Details
                    </button>
                    <button
                        onClick={() => handleWatch(movie.id)}
                        className="flex-1 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-3 py-2 text-center transition-colors"
                    >
                        Watch
                    </button>
                    <button
                        onClick={() => handleShare(movie.title)}
                        className="p-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        aria-label="Share movie"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    );
};