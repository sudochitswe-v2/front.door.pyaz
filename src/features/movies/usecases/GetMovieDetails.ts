import type { IMovieDetail } from '../models/IMovieDetail';

const API_BASE_URL = import.meta.env.VITE_MEILISEARCH_BASE_URL;
const API_KEY = import.meta.env.VITE_MEILISEARCH_API_KEY;

class GetMovieDetails {
    async query(id: string): Promise<IMovieDetail> {
        try {
            const response = await fetch(API_BASE_URL + '/indexes/alist/documents//' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movie: ' + response.statusText);
            }
            const movie: IMovieDetail = await response.json();
            return movie;
        } catch (error) {
            console.error('Error fetching movie detail:', error);
            throw error;
        }
    }
};
export const getMovieDetails = new GetMovieDetails();