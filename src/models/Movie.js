const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        match: [/[a-zA-Z0-9\s]+/, 'The title should consist only of English letters, digits and whitespace characters'],
        minLength: [5, 'The title should be at least 5 characters long'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        lowercase: true,
        match: [/[a-zA-Z0-9\s]+/, 'The genre should consist only of English letters, digits and whitespace characters'],
        minLength: [5, 'The genre should be at least 5 characters long'],
        trim: true
    },
    director: {
        type: String,
        required: [true, 'Director is required'],
        match: [/[a-zA-Z0-9\s]+/, 'The director should consist only of English letters, digits and whitespace characters'],
        minLength: [5, 'The director should be at least 5 characters long'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1900, 'The minimum year is 1900'],
        max: [2024, 'The maximum year is 2024']
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie Poster is required'],
        match: [
            /https?:\/\//i,
            `The movie poster image URL should start with "http://" or "https://"`
        ],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'The minimum rating is 1'],
        max: [5, 'The maximum rating is 5']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [20, 'The description should be at least 20 characters long'],
        match: [/[a-zA-Z0-9\s]+/, 'The description should consist only of English letters, digits and whitespace characters'],
        trim: true
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;