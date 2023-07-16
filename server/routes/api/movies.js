const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/movieController');

router.route('/')
	.get(moviesController.getAllMoviesByOwner)
	.post(moviesController.addMovie);

router.route('/:id')
	.patch(moviesController.updateMovie)
	.delete(moviesController.deleteMovie);

module.exports = router;