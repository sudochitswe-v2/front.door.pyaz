import type { ResponseModel } from '../../../models/IResponeModel';
import type { Movie } from '../models/IMovie';

const API_BASE_URL = import.meta.env.VITE_MEILISEARCH_BASE_URL;
const API_KEY = import.meta.env.VITE_MEILISEARCH_API_KEY;

interface SearchParams {
  query?: string;
  limit?: number;
  offset?: number;
}

class MovieService {
  async searchMovies(params: SearchParams = {}): Promise<ResponseModel<Movie>> {
    const { query = '', limit = 12, offset = 0 } = params;

    const payload = {
      q: query,
      limit: limit,
      offset: offset,
      filter: "is_dir = false",
      attributesToRetrieve: ["*"],
      attributesToHighlight: ["*"]
    };

    const response = await fetch(`${API_BASE_URL}/indexes/alist/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getMovieById(id: number): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const movieService = new MovieService();