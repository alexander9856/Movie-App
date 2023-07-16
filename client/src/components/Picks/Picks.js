import './Picks.css';
import { PicksItem } from "./PicksItem";
import { filterOptions } from '../../helpers/constants';
import { Spinner } from '../Spinner/Spinner';
import { useContext } from 'react';
import { MyMoviesContext } from '../../contexts/MyMoviesProvider';
import { ReactNotifications } from 'react-notifications-component';

export const Picks = () => {
    const { myMovies, filter, loading, onChangeFilter, onClickAction } = useContext(MyMoviesContext);
    const filteredMovies = filter === 'all' ? myMovies : myMovies?.filter(movie => movie.collection === filter);
    return (
        <main data-testid="my-picks">
            <ReactNotifications />
            <>
                {loading && <Spinner />}
                <div className="catalog-title-wrapper">
                    <h2 className="catalog-title">Manage Collections</h2>
                    <select id="filterBy" name="filterBy" value={filter} onChange={onChangeFilter}>
                        {filterOptions.map((option) => (
                            <option key={option.value} value={option.value} className="filter-option">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="items-container" data-testid="picks-container">
                    {filteredMovies?.map(x => (
                        <PicksItem key={x.id} item={x} onClickAction={onClickAction} filter={filter} />
                    ))}
                </div>
            </>
        </main>
    );
};
