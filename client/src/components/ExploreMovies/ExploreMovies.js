import './ExploreMovies.css'
import { useContext } from "react";
import { PublicMoviesContext } from '../../contexts/PublicMoviesProvider';
import { Slider } from "./Slider";
import { SearchBarFooter } from "./SearchBarFooter";
import { optionsRandom } from '../../helpers/constants';
import { Spinner } from "../Spinner/Spinner";
import { ReactNotifications } from 'react-notifications-component'
export const ExploreMovies = () => {
    const {
        movies,
        searchedMovies,
        searchValue,
        onSearchHandler,
        selected,
        onSelectChangeHandler,
        loading,
    } = useContext(PublicMoviesContext);
    return (
        <main data-testid="explore-movies">
            <ReactNotifications />
            <>
                {loading && <Spinner />}
                <div className="catalog-title-wrapper">
                    <h2 className="catalog-title">Explore Movies</h2>
                    <select
                        id="selectBy"
                        name="selectBy"
                        value={selected}
                        onChange={onSelectChangeHandler}
                    >
                        {optionsRandom.map((option) => (
                            <option key={option.value} value={option.value} className="filter-option">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="slider-container" data-testid="slider">
                    <Slider movies={searchedMovies || movies} />
                </div>
                <SearchBarFooter searchValue={searchValue} onSearchHandler={onSearchHandler} />
            </>

        </main>
    );
};