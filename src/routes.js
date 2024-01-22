const router = require('express').Router();
const homeController = require('./controllers/homeController');
const movieController = require('./controllers/moviesController');

router.use(homeController);
router.use(movieController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;