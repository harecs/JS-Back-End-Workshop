const express = require('express');
const path = require('path');

const configHandlebars = require('./config/configHandlebars');

const port = 5001;
const app = express();

app.use(express.static(path.join(__dirname, './public')));

configHandlebars(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));