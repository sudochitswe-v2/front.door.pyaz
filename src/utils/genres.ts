/**
 * Utility functions for handling genres
 */


/**
 * Get genres from environment variables or fall back to default genres
 */
export function getGenresFromEnv(): string[] {
  // Check if VITE_APP_GENRES is defined in environment
  const envGenres = import.meta.env.VITE_APP_GENRES;
  
  if (envGenres && typeof envGenres === 'string') {
    // Split the genres string by comma and trim whitespace
    return envGenres.split(',').map(genre => genre.trim()).filter(genre => genre.length > 0);
  }
  
  // Return default genres if environment variable is not set
  return [];
}

/**
 * Get the available genres for the app
 */
export const AVAILABLE_GENRES = getGenresFromEnv();

/**
 * Format a genre string for use in API filters
 * Meilisearch expects array values to be in the format: "genres = 'Action'"
 */
export function formatGenreFilter(genre: string): string {
  return `genres = '${genre}'`;
}