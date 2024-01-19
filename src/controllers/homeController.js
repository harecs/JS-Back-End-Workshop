const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', (req, res) => {
    res.render('home', { movies: movieService.getAllMovies() });
});

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;