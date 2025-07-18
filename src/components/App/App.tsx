import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type { Movie } from "../../types/movie.ts";
import { useMoviesQuery } from "../../hooks/useMoviesQuery.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import css from "./App.module.css";

function App() {
    const [query, setQuery] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    
    const { data, isLoading, error } = useMoviesQuery(query, page)

    const handleSubmit = (searchQuery: string) => {
        setQuery(searchQuery)
        setPage(1)
        
        if (!searchQuery.trim()) {
            return
        }
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

    if (error) {
        return (
            <>
                <SearchBar onSubmit={handleSubmit}/>
                {isLoading ? (<Loader/>) : (<ErrorMessage message={error.message}/>)}
                <Toaster position="top-center"/>
            </>
        )
    }

    const movies = data?.results || []
    const totalPages = data?.total_pages || 0

    if (query && movies.length === 0 && !isLoading) {
        toast.error('No movies found for your request')
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit}/>
            {isLoading ? (<Loader/>) : (<MovieGrid
                movies={movies}
                onSelect={onSelect}
            />)}
            {totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    forcePage={page - 1}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    nextLabel="→"
                    previousLabel="←"
                />
            )}
            {currentMovie && (
                <MovieModal
                    movie={currentMovie}
                    onClose={onClose}
                />)}
            <Toaster position="top-center"/>
        </>
    )
}

export default App
