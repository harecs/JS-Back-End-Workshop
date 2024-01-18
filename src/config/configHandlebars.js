function configHandlebars(app) {
    app.engine('hbs', require('express-handlebars').engine({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');
    app.set('views', require('path').join(__dirname, '../views'));
}

module.exports = configHandlebars;