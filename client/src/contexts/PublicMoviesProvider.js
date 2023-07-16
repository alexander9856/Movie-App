import { createContext, useState, useEffect } from "react";
import { postMovie } from '../services/localApi';
import { createNotification, capitalize } from '../helpers/notifications';
import { publicMoviesData } from '../services/publicApi';

export const PublicMoviesContext = createContext();

export const PublicMoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState(null);
    const [selected, setSelected] = useState('most_pop_movies');
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);

    const onSelectChangeHandler = (e) => {
        setSelected(e.target.value);
        setSearchValue('');
    };
    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await publicMoviesData(searchValue, selected);
            const { movies, searchedMovies } = data;
            setSearchedMovies(searchedMovies);
            setMovies(movies);
            setLoading(false)
        })()
    }, [searchValue, selected]);

    const onSearchHandler = (e) => setSearchValue(e.target.value);

    const postMovieToCollection = async (data, list) => {
        try {
            const res = await postMovie(data);
            if (!res.ok) {
                throw new Error();
            }
            createNotification('Success', `Added to ${capitalize(list)}.`, "success")
        }
        catch (err) {
            if (err.message === 'Failed to fetch') {
                createNotification('Error', `${err.message}.`, 'danger');
            }
            else {
                createNotification('Error', 'Movie is already added to collection.', 'warning');
            }
        }
    }
    const onClickPost = async (list, id) => {
        const data = {
            owner: "alexander",
            movieId: id,
            list
        };
        await postMovieToCollection(data, list)
    };

    const contextValues = {
        movies,
        searchedMovies,
        selected,
        searchValue,
        loading,
        onSearchHandler,
        onSelectChangeHandler,
        onClickPost,
    };

    return (
        <PublicMoviesContext.Provider value={contextValues}>
            {children}
        </PublicMoviesContext.Provider>
    );
};