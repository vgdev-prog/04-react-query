import SearchBar from "../SearchBar/SearchBar.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import styles from './Header.module.css';

export interface HeaderProps {
    onSubmit: (query: string) => void
    totalPages?: number
    currentPage?: number
    onPageChange?: ({ selected }: { selected: number }) => void
}

const Header = ({ onSubmit, totalPages = 0, currentPage = 1, onPageChange }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                   Filmix
                </a>
                {totalPages > 1 && onPageChange && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                )}
                <SearchBar onSubmit={onSubmit} />

            </div>
        </header>
    );
};

export default Header;