const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/movies/create', (req, res) => {
    res.render('create');
});

router.post('/movies/create', (req, res) => {
    movieService.addMovie(req.body);
    res.redirect('/');
});

router.get('/movies/search', (req, res) => {
    const movies =
        Object.values(req.query).length == 0
            ? movieService.getAllMovies()
            : movieService.search(req.query);

    return res.render('search', { movies });
});

router.get('/movies/:movieId', (req, res) => {
    const movieInfo = movieService.getMovie(req.params.movieId);
    const ratingArray = new Array(Number(movieInfo.rating)).fill(true);
    // &#x2605;
    res.render('details', { movieInfo, ratingArray });
});

module.exports = router;