import { createNotification } from '../helpers/notifications';
import { RAPID_API_KEY } from '../helpers/constants'
const baseUrl = "https://moviesdatabase.p.rapidapi.com";
async function request(method, url) {
    let option = {
        method,
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }
    let res = await fetch(baseUrl + url, option);
    return res
}
export const getMovies = async (url) => await request("GET", url);

export const publicMoviesData = async (searchValue, selected) => {
    try {
        const url = searchValue ? `/titles/search/title/${searchValue}` : `/titles/random?list=${selected}`;
        const res = await getMovies(url);
        const data = await res.json();
        return {
            movies: searchValue ? [] : data.results,
            searchedMovies: searchValue ? data.results : null,
        };
    } catch (err) {
        createNotification('Error', `${err.message}.`, 'danger');
    }
};



