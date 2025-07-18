import { useQuery } from '@tanstack/react-query'
import { fetchMovie } from '../services/movieService.ts'
import type { MovieSearchResponse } from "../types/movie.ts";

export const useMoviesQuery = (query: string, page: number = 1) => {
    return useQuery<MovieSearchResponse>({
        queryKey: ['searchMovie', query, page],
        queryFn: () => fetchMovie(query, page),
        enabled: !!query
    })
}