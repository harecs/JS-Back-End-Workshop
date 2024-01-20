const router = require('express').Router();

router.get('/movies/create', (req, res) => {
    res.render('create');
});

module.exports = router;