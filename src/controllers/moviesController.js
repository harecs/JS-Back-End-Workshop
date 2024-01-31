const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/movies/create', (req, res) => {
    res.render('movie/create');
});

router.post('/movies/create', async (req, res) => {
    await movieService.addMovie(req.body);
    res.redirect('/');
});

router.get('/movies/search', async (req, res) => {
    const movies =
        Object.values(req.query).length == 0
            ? movieService.getAllMovies().lean()
            : movieService.search(req.query).lean();

    res.render('search', { movies: await movies });
});

router.get('/movies/:movieId', async (req, res) => {
    const movieInfo = await movieService.getMovie(req.params.movieId).lean();

    if (!movieInfo) {
        res.redirect('/404');
    }

    const ratingArray = new Array(Number(movieInfo.rating)).fill(true);

    res.render('movie/details', { movieInfo, ratingArray });
});

module.exports = router;