const express = require('express');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const configMongoose = require('./config/configMongoose');
const router = require('./routes');

const port = 5001;
const app = express();

configExpress(app);
configHandlebars(app);

app.use(router);

configMongoose()
    .then(() => console.log('DB Connected'))
    .then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}...`));
    });