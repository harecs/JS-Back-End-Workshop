const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');
const { auth } = require('./middlewares/authMiddleware');

router.use(homeController);
router.use('/auth', authController);
router.use('/movies', movieController);
router.use('/cast', castController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;