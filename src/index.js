const express = require('express');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const router = require('./routes');

const port = 5001;
const app = express();

configExpress(app);
configHandlebars(app);

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}...`));