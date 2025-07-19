import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type { Movie } from "../../types/movie.ts";
import { useMoviesQuery } from "../../hooks/useMoviesQuery.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import { keepPreviousData } from "@tanstack/react-query";

function App() {
    const [query, setQuery] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

    const { data, isPending, isError, isSuccess, error } = useMoviesQuery(query, page, {
        enabled: !!query,
        placeholderData: keepPreviousData,
    })

    const handleSubmit = (searchQuery: string) => {
        setQuery(searchQuery)
        setPage(1)
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setPage(selected + 1)
    }

    function onSelect(movie: Movie): void {
        setCurrentMovie(movie)
    }

    function onClose() {
        setCurrentMovie(null)
    }
    
    useEffect(() => {
        if (isSuccess && data?.results.length === 0) {
            toast.error('No movies found for your request');
        }
    }, [isSuccess, data]);

    const movies = data?.results || []
    const totalPages = data?.total_pages || 0

    return (
        <>
            <Toaster position="top-center"/>
            <SearchBar onSubmit={handleSubmit} />

            {isPending && <Loader/>}
            {isError && <ErrorMessage message={error.message}/>}
            
            {isSuccess && movies.length > 0 && (
                <MovieGrid
                    movies={movies}
                    onSelect={onSelect}
                />
            )}

            {isSuccess && totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    forcePage={page - 1}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                />
            )}

            {currentMovie && (
                <MovieModal
                    movie={currentMovie}
                    onClose={onClose}
                />)}
        </>
    )
}

export default App