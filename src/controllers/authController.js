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

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        res.redirect('/auth/login');
    }    
});

module.exports = router;