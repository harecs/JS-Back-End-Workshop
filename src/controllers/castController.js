const router = require('express').Router();

const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('cast/create');
});

router.post('/create', isAuth, async (req, res) => {
    await castService.addCast(req.body);
    res.redirect('/');
});

module.exports = router;