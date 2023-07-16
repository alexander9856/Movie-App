import { DebounceInput } from 'react-debounce-input';
export const SearchBarFooter = ({ searchValue, onSearchHandler }) => {
    return (
        <div className="searchBarFooter">
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search" className="searchLabel">Looking for your favorite movie?</label>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    type="text"
                    placeholder="Search..."
                    id="search"
                    value={searchValue}
                    onChange={onSearchHandler} />
            </form>
        </div>
    )
}