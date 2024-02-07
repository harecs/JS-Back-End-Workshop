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
        return res.status(404).render('404', { error: `The requested movie doesn't exist` });
    }

    const ratingArray = new Array(Number(movieInfo.rating)).fill(true);

    res.locals.isOwner = req.userId == movieInfo.owner ? true : false;
    res.render('movie/details', { movieInfo, ratingArray });
});

router.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    let movieInfo = {};
    let availableCasts = {};

    try {
        movieInfo = await movieService.getMovie(req.params.movieId).lean();
    } catch (err) {
        return res.status(404).render('404', { error: `The requested movie doesn't exist` });
    }

    try {
        availableCasts = await castService.getAllAvailableCasts().lean();
    } catch (err) {
        return res.status(500).render('500', { error: `There was an error on our behalf. Sorry for the inconvenience.` });
    }

    res.render('movie/attachCast', { movieInfo, availableCasts });
});

router.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    let movieInfo = {};
    let availableCasts = {};

    try {
        movieInfo = await movieService.getMovie(req.params.movieId).lean();
    } catch (err) {
        return res.status(404).render('404', { error: `The requested movie doesn't exist` });
    }

    try {
        availableCasts = await castService.getAllAvailableCasts().lean();
    } catch (err) {
        return res.status(500).render('500', { error: `There was an error on our behalf. Sorry for the inconvenience.` });
    }

    if (req.body.cast === 'none') {
        return res.render('movie/attachCast', { movieInfo, availableCasts, error: 'You should choose a cast from the dropdown' });
    }

    try {
        await movieService.attachCast(req.params.movieId, req.body.cast);
        res.redirect(`/movies/${req.params.movieId}`);
    } catch (err) {
        res.render('movie/attachCast', { movieInfo, availableCasts, error: `There was an error on our behalf. Sorry for the inconvenience.` });
    }
});

router.get('/:movieId/edit', isAuth, async (req, res) => {
    let movieInfo = {};

    try {
        movieInfo = await movieService.getMovie(req.params.movieId).lean();
    } catch (err) {
        return res.status(404).render('404', { error: `The requested movie doesn't exist` });
    }
    
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