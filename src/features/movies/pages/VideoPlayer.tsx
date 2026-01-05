import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Player from '../components/Player';
import type { IMovieDetail } from '../models/IMovieDetail';
import { getMovieDetails } from '../usecases/GetMovieDetails';

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
    return <div>Loading...</div>;
  }

  if (error || !movie) {
    return <div>Error: {error || 'Movie not found'}</div>;
  }

  // Construct video URL from env base URL + movie detail parent/name
  const videoUrl = `${import.meta.env.VITE_VIDEO_BASE_URL}/d/${movie.parent}/${movie.name}`;

  // ArtPlayer options
  const artPlayerOptions = {
    container: '', // Will be set by Player component
    url: videoUrl,
    title: movie.title,
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
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
    <div className="video-player-page">
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p><strong>ID:</strong> {movie.id}</p>
        <p><strong>Name:</strong> {movie.name}</p>
        <p><strong>Parent:</strong> {movie.parent}</p>
        <p><strong>Is Directory:</strong> {movie.is_dir ? 'Yes' : 'No'}</p>
        <p><strong>Size:</strong> {movie.size} bytes</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Popularity:</strong> {movie.popularity}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
        <p><strong>Keywords:</strong> {movie.keywords?.join(', ')}</p>
        {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ maxWidth: '200px', margin: '10px 0' }} />}
        {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} style={{ maxWidth: '300px', margin: '10px 0' }} />}
      </div>

      <div className="player-container">
        <Player option={artPlayerOptions} style={{ width: '100%', height: '400px' }} />
      </div>
    </div>
  );
};

export default VideoPlayer