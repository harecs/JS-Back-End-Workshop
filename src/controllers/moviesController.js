const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/movies/create', (req, res) => {
    res.render('create');
});

router.post('/movies/create', (req, res) => {
    movieService.addMovie(req.body);
    res.redirect('/');
});

module.exports = router;