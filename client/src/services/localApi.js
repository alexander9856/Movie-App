import { getMovies } from './publicApi';
import { createNotification } from '../helpers/notifications';

const host = "http://localhost:3500";
async function request(method, data) {
    let options = {
        method,
        headers: {}
    }
    if (method === "GET") {
        return await fetch(host + '/movies?owner=alexander', options);
    }
    else if (data && method === 'POST') {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
        return await fetch(host + '/movies', options);
    }
    else if (data && method === "PATCH") {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify({ list: data.listToPatch })
        return await fetch(host + `/movies/${data.privateId}`, options);
    }
    else if (method === "DELETE") {
        await fetch(host + `/movies/${data.privateId}`, options);
    }
}

export const getMyMovies = async () => await request("GET");
export const postMovie = async (data) => await request("POST", data);
export const patchMovie = async (data) => await request('PATCH', data);
export const delMovie = async (data) => await request('DELETE', data);

export const myMoviesData = async () => {
    const collections = {};
    try {
        const res = await getMyMovies();
        const data = await res.json();
        data?.forEach(x => {
            collections[x.movieId] = {
                category: x.list[0],
                privateId: x._id
            };
        });

        const joined = data.map(x => x.movieId).join(',');

        const response = await getMovies(`/titles/x/titles-by-ids?idsList=${encodeURIComponent(joined)}`);
        let myMoviesData = await response.json();
        myMoviesData = myMoviesData.results;
        myMoviesData?.forEach(x => {
            x.collection = collections[x.id].category;
            x.privateId = collections[x.id].privateId;
        });
        return myMoviesData
    }
    catch (err) {
        createNotification('Error', `${err.message}.`, "danger")
    }
}
