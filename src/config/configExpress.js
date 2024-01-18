const express = require('express');

function configExpress(app) {
    app.use(express.static(require('path').join(__dirname, '../public')));
}

module.exports = configExpress;