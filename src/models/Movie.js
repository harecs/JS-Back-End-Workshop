const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: new Date().getUTCFullYear()
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 350
    },
    imageUrl: {
        type: String,
        required: true,
        match: [
            /https?:\/\//i,
            `The image URL does't start with "http://" or "https://"`
        ]
    },
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cast'
    }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;