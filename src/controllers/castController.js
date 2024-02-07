const router = require('express').Router();

const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('cast/create');
});

router.post('/create', isAuth, async (req, res) => {
    const castInfo = req.body;

    try {
        await castService.addCast(castInfo);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('cast/create', { ...castInfo, error: message });
    }
});

module.exports = router;