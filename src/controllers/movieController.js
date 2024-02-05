const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.post('/create', isAuth, async (req, res) => {
    await movieService.addMovie(req.body, req.userId);
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

    res.locals.isOwner = req.userId == movieInfo.owner ? true : false;
    res.render('movie/details', { movieInfo, ratingArray });
});

router.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieInfo = await movieService.getMovie(req.params.movieId).lean();
    const availableCasts = await castService.getAllAvailableCasts().lean();
    res.render('movie/attachCast', { movieInfo, availableCasts });
});

router.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    if (req.body.cast === 'none') {
        return res.redirect(`/movies/${req.params.movieId}/attach-cast`);
    }

    movieService.attachCast(req.params.movieId, req.body.cast);
    res.redirect(`/movies/${req.params.movieId}`);
});

router.get('/:movieId/delete', isAuth, async (req, res) => {
    await movieService.deleteMovie(req.params.movieId);
    res.redirect('/');
});

module.exports = router;