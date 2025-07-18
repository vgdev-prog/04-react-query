import styles from './SearchBar.module.css'
import {toast} from "react-hot-toast";

export interface SearchBarProps {
    onSubmit: (query: string) => void
}

const SearchBar = ({onSubmit}: SearchBarProps) => {
    const handleSubmitForm = (formData: FormData) => {
        const query = formData.get("query") as string;
        if (!query.trim()) {
            toast.error('Please enter your search query')
            return
        }
        onSubmit(query);
    }

    return (
        <form className={styles.form} action={handleSubmitForm}>
            <input
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
            />
            <button className={styles.button} type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchBar;