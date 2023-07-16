const Movie = require('../model/Movie');

const getAllMoviesByOwner = async (req, res) => {
    let filter = {};
    if (req?.query?.owner) {
      filter = { owner: req.query.owner };
    }

    const movies = await Movie.find(filter);
    res.setHeader('Control-Cache', 'public, max-age=300');
    res.json(movies);
}

const addMovie = async (req, res) => {
    if (!req?.body?.movieId || !req?.body?.owner) {
        return res.status(400).json({ 'message': 'MovieId and owner fields are required' });
    }

    try {
        const result = await Movie.create({
            movieId: req.body.movieId,
            owner: req.body.owner,
            list: req.body.list
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        if(err.message.indexOf('duplicate')) {
            res.status(409).json({ 'message': "This movie is already added to owners collection" });
        } else {
            res.status(500).json({ 'message': "Well, something went wrong, sorry"});
        }
    }
}

const updateMovie = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const movie = await Movie.findOne({ _id: req.params.id }).exec();
    if (!movie) {
        return res.status(404).json({ "message": `No movie record matches ID ${req.params.id}.` });
    }
    if (req.body?.list) movie.list = req.body.list;

    const result = await movie.save();
    res.json(result);
}

const deleteMovie = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Movie ID required.' });

    try {
      const movie = await Movie.findOne({ _id: req.params.id }).exec();
      await movie.deleteOne(); //{ _id: req.params.id }
    } catch (err) {
      return res.status(404).json({ "message": `No movie record matches ID ${req.params.id}.` });
    }

    res.send(204);
}

module.exports = {
    getAllMoviesByOwner,
    addMovie,
    updateMovie,
    deleteMovie
}