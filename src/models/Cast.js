const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [/[a-zA-Z0-9\s]+/, 'The name should consist only of English letters, digits and whitespace characters'],
        minLength: [5, 'The name should be at least 5 characters long'],
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'The minimum age is 1'],
        max: [120, 'The maximum age is 120']
    },
    born: {
        type: String,
        required: true,
        match: [/[a-zA-Z0-9\s]+/, 'The born should consist only of English letters, digits and whitespace characters'],
        minLength: [10, 'The born should be at least 10 characters long'],
        trim: true
    },
    nameInMovie: {
        type: String,
        required: true,
        match: [/[a-zA-Z0-9\s]+/, 'The name in movie should consist only of English letters, digits and whitespace characters'],
        minLength: [5, 'The name in movie should be at least 5 characters long'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        match: [
            /https?:\/\//i,
            `The cast image URL should start with "http://" or "https://"`
        ]
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;