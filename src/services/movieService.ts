import axios from "axios";
import type { Movie } from "../types/movie.ts";

interface MovieSearchResponse {
    results: Movie[];
    total_pages: number;
    page: number;
    total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_KEY = import.meta.env.VITE_API_TOKEN;

const http = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export const fetchMovie = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
    const urlSearchParams: URLSearchParams = new URLSearchParams({
        query,
        page: page.toString()
    });
    
    const {data} = await http.get<MovieSearchResponse>(`/search/movie?${urlSearchParams.toString()}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEARER_KEY}`
        }
    });
    
    return data;
};