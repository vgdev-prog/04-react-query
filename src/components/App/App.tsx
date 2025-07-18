import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Header from "../Header/Header.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type { Movie } from "../../types/movie.ts";
import { useMoviesQuery } from "../../hooks/useMoviesQuery.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

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
                <Header 
                    onSubmit={handleSubmit}
                    totalPages={0}
                    currentPage={1}
                    onPageChange={handlePageChange}
                />
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
            <Header 
                onSubmit={handleSubmit}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
            {isLoading ? (<Loader/>) : (<MovieGrid
                movies={movies}
                onSelect={onSelect}
            />)}
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
