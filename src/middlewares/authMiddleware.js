const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decoded = await jwt.verify(token, SECRET);
        req.userId = decoded._id;
        res.locals.isAuthenticated = true;

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.userId) {
        return res.redirect(303, '/auth/login');
    }

    next();
}

exports.isNotAuth = (req, res, next) => {
    if (req.userId) {
        return res.redirect(303, '/');
    }

    next();
}