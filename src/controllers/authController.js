const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth, isNotAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', isNotAuth, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isNotAuth, async (req, res) => {
    const registerInfo = req.body;

    try {
        await authService.register(registerInfo);
        res.redirect('/auth/login');
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('auth/register', { ...registerInfo, error: message });
    }
});

router.get('/login', isNotAuth, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isNotAuth, async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.cookie('auth', token, { httpOnly: true }).redirect('/');
    } catch (err) {
        res.redirect('/auth/login');
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth').redirect('/');
});

module.exports = router;