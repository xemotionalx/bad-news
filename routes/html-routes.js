var path = require("path");

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { layout: 'main.handlebars' });
    });

    app.get('/saved-comments', function(req, res, next) {
        res.render('saved.handlebars', { layout: 'main.handlebars' });
    });
};