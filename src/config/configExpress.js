const express = require('express');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

function configExpress(app) {
    app.use(express.static(require('path').join(__dirname, '../public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = configExpress;