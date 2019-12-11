var path = require("path");

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { layout: 'main.handlebars' });
    });
};