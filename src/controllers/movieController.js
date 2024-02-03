const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('movie/create');
});

router.post('/create', async (req, res) => {
    await movieService.addMovie(req.body);
    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const movies =
        Object.values(req.query).length == 0
            ? movieService.getAllMovies().lean()
            : movieService.search(req.query).lean();

    res.render('search', { movies: await movies });
});

router.get('/:movieId', async (req, res) => {
    const movieInfo = await movieService.getMovie(req.params.movieId).populate('casts').lean();

    if (!movieInfo) {
        res.redirect('/404');
    }

    const ratingArray = new Array(Number(movieInfo.rating)).fill(true);

    res.render('movie/details', { movieInfo, ratingArray });
});

router.get('/:movieId/attach-cast', async (req, res) => {
    const movieInfo = await movieService.getMovie(req.params.movieId).lean();
    const availableCasts = await castService.getAllAvailableCasts().lean();
    res.render('movie/attachCast', { movieInfo, availableCasts });
});

router.post('/:movieId/attach-cast', async (req, res) => {
    movieService.attachCast(req.params.movieId, req.body.cast);
    res.redirect(`/movies/${req.params.movieId}`);
});

module.exports = router;