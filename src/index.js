const express = require('express');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const port = 5001;
const app = express();

configExpress(app);
configHandlebars(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));