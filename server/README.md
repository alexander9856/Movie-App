## Extremely Simple Movie Lists CRUD API

This API is created for CRUD practice purpose, built in Node.js with Express.js Framework.
It does **not** follow the best practices for building Node.js APIs.Don't take it as an example.

For simplicity:
- **NO** Authentication/Authorization Required
- Ask the repository maintainer for Database URI secret

**ATTENTION:** The API is using a cloud-hosted MongoDB Database (Atlas) which has a very low concurrency/request limits.  

If the limit is exceeded, the database will stop working and you will have to deal with launching your own local MongoDB instance. So, for your own comfort, don't abuse it.

## API Documentation

### Movie Schema:
```txt
 {
    "_id": ObjectId (Auto-generated),
    "movieId": UUID String,
    "owner": String (use your own name),
    "collection": ENUM (one of "wishlist", "favorites" or just "watched"
  }
```

> This API is a **companion** for the [MoviesDatabase](https://rapidapi.com/SAdrian/api/moviesdatabase/details).

Public APIs are **read-only**, that is why in order to practice the CRUD operations, we need our own API. This one provides such opportunity.

### Routes

- GET `/` - Check if the server is up and running
- GET `/movies` - Lists all added movies for all owners by _default_ BUT **PLEASE** always use it with the query param `/movies?owner=yourname` in order to list only YOUR movies.
- PATCH `/movies/:id` - _move_ the movie record to another list (use the _id here)
- DELETE `/movies/:id` - remove the movie from the owner's collection
