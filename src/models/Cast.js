const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 125
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        match: [
            /https?:\/\//i,
            `The image URL does't start with "http://" or "https://"`
        ]
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;