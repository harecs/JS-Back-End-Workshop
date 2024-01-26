const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
    res.render('home', { movies: await movieService.getAllMovies().lean() });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;