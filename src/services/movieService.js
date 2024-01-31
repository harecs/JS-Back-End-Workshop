const Movie = require('../models/Movie');

exports.getAllMovies = () => {
    return Movie.find();
};

exports.getMovie = (id) => {
    return Movie.findById(id);
};

exports.addMovie = (movieInfo) => {
    return Movie.create(movieInfo);
};

exports.search = (reqQuery) => {
    const filterQuery = {};

    if (reqQuery.title) {
        filterQuery.title = new RegExp(`${reqQuery.title}`, 'i');
    }

    if (reqQuery.genre) {
        filterQuery.genre = reqQuery.genre.toLowerCase();
    }

    if (reqQuery.year) {
        filterQuery.year = Number(reqQuery.year)
    }

    return Movie.find(filterQuery);
}