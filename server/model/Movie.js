const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    list: {
        type: ['watched', 'wishlist', 'favorites'],
        required: false,
        default: 'watched'
    }
});

movieSchema.index({ movieId: 1, owner: 1}, { unique: true });

module.exports = mongoose.model('Movie', movieSchema);