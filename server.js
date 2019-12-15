var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

// Require all models
var db = require("./models");

//sets port
var PORT = process.env.PORT || 8080;

//init express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
//SERVE HTML ROUTES
require("./routes/html-routes")(app);

// HANDLEBARS SETUP
var exphbs = require("express-handlebars");

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
    })
);
app.set("view engine", "handlebars");
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


//START THE SERVER - LISTEN TO REQUESTS
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});