const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', (req, res) => {
    res.render('home', { movies: movieService.getAllMovies() });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;