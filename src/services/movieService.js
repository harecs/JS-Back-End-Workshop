const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAllMovies = () => Movie.find();

exports.getMovie = (movieId) => Movie.findById(movieId)

exports.addMovie = (reqBody, userId) => {
    const movieInfo = JSON.parse(JSON.stringify(reqBody));
    movieInfo.owner = userId;

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

exports.attachCast = async (movieId, castId) => {
    await Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    await Cast.findByIdAndUpdate(castId, { movie: movieId });
    return;
}

exports.editMovie = (movieId, movieInfo) => Movie.findByIdAndUpdate(movieId, movieInfo);

exports.deleteMovie = (movieId) => Movie.findByIdAndDelete(movieId);