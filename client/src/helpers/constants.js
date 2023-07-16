export const optionsRandom = [
    { value: "most_pop_movies", label: "Most Pop Movies" },
    { value: "most_pop_series", label: "Most Pop Series" },
    { value: "top_boxoffice_200", label: "Top BoxOffice 200" },
    { value: "top_boxoffice_last_weekend_10", label: "Top BoxOffice last weekend 10" },
    { value: "top_rated_250", label: "Top rated 250" },
    { value: "top_rated_english_250", label: "Top rated english 250" },
    { value: "top_rated_lowest_100", label: "Top rated lowest 100" },
    { value: "top_rated_series_250", label: "Top rated series 250" }
];


export const filterOptions = [
    { value: "all", label: "All" },
    { value: "favorites", label: "Favorites" },
    { value: "watched", label: "Watched" },
    { value: "wishlist", label: "Wishlist" },
];

export const fav = 'favorites';
export const wd = 'watched';
export const wl = 'wishlist';

export const star = "fa-solid fa-star"
export const watched = "fa-solid fa-eye"
export const wishlist = "fa-solid fa-bookmark"
export const trash = "fa-solid fa-trash"

//i removed it from .env in order to work the app when u initially start it
export const RAPID_API_KEY = '9b8fe93991msh03acd86d36d21e1p15b2a0jsn6b8c57b10ee0'