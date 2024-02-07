const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtils');

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.post('/create', isAuth, async (req, res) => {
    const movieInfo = req.body;

    try {
        await movieService.addMovie(movieInfo, req.userId);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('movie/create', { ...movieInfo, error: message });
    }
});

router.get('/search', async (req, res) => {
    let movies = {};

    try {
        if (Object.values(req.query).length == 0) {
            movies = await movieService.getAllMovies().lean();
        } else {
            movies = await movieService.search(req.query).lean();
        }
    } catch (err) {
        const message = getErrorMessage(err);
        return res.status(500).render('search', { error: message });
    }


    res.render('search', { movies });
});

router.get('/:movieId', async (req, res) => {
    let movieInfo = {};

    try {
        movieInfo = await movieService.getMovie(req.params.movieId).populate('casts').lean();
    } catch (err) {
        res.locals.error = 'The requested movie does not exist';
        return res.status(404).redirect('/home');
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

router.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieInfo = await movieService.getMovie(req.params.movieId).lean();
    res.render('movie/edit', movieInfo);
});

router.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieInfo = req.body;

    try {
        await movieService.editMovie(req.params.movieId, movieInfo);
        res.redirect(`/movies/${req.params.movieId}`);
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('movie/edit', { ...movieInfo, error: message });
    }
});

router.get('/:movieId/delete', isAuth, async (req, res) => {
    await movieService.deleteMovie(req.params.movieId);
    res.redirect('/');
});

module.exports = router;