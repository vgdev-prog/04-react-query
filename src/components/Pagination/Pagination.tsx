import ReactPaginate from "react-paginate";
import styles from './Pagination.module.css';

export interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: ({ selected }: { selected: number }) => void
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
        />
    );
};

export default Pagination;