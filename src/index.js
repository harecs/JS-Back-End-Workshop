const express = require('express');
const handlebars = require('express-handlebars');

const port = 5001;
const app = express();

app.listen(port, () => console.log(`Server is running on port ${port}...`));