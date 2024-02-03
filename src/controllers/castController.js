const router = require('express').Router();

const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    await castService.addCast(req.body);
    res.redirect('/');
});

module.exports = router;