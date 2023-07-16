import { createContext, useState, useEffect } from "react";
import { delMovie, patchMovie } from '../services/localApi';
import { createNotification, capitalize } from '../helpers/notifications'
import { myMoviesData } from '../services/localApi'

export const MyMoviesContext = createContext();

export const MyMoviesProvider = ({ children }) => {
    const [myMovies, setMyMovies] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const onChangeFilter = (e) => setFilter(e.target.value);

    const deleteMovie = async (item) => {
        try {
            await delMovie(item);
            setMyMovies((prevMovies) => prevMovies.filter((movie) => movie !== item));
            createNotification(
                "Success",
                `Successfully removed from ${capitalize(item.collection)}.`,
                "success"
            );
        } catch (err) {
            createNotification("Error", `${err.message}`, "danger");
        }
    };

    const patchMovieCollection = async (listToPatch, item) => {
        if (listToPatch === item.collection) {
            return createNotification("Error", `Movie is already in ${capitalize(listToPatch)}.`, "warning");
        }
        const privateId = item.privateId;
        const updatedItems = myMovies?.map((movie) => movie.privateId === item.privateId ? { ...movie, collection: listToPatch } : movie);

        try {
            await patchMovie({ privateId, listToPatch });
            setMyMovies(updatedItems);
            createNotification("Updated", `Added to ${capitalize(listToPatch)}.`, "success");
        } catch (err) {
            createNotification("Error", `${err.message}`, "danger");
        }
    };

    const onClickAction = async (method, listToPatch, item) => {
        if (method === "DELETE") {
            await deleteMovie(item);
        } else {
            await patchMovieCollection(listToPatch, item);
        }
    };

    useEffect(() => {
        (async () => {
            const data = await myMoviesData();
            setMyMovies(data)
            setLoading(false);
        })()
    }, []);

    const contextValues = {
        myMovies,
        filter,
        loading,
        onChangeFilter,
        onClickAction,
    };

    return (
        <MyMoviesContext.Provider value={contextValues}>
            {children}
        </MyMoviesContext.Provider>
    );
};