const router = require('express').Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        await authService.register(req.body);
        res.redirect('/auth/login');
    } catch (err) {
        res.redirect('/auth/register');
    }
});

module.exports = router;