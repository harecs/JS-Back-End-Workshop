const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const port = 5001;
const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));