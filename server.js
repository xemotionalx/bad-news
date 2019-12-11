var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");
var PORT = process.env.PORT || 8080;

var app = express();

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





//SCRAPING THE ARTICLES WITH CHEERIO

axios.get("https://theslot.jezebel.com/").then(function(response) {

    var $ = cheerio.load(response.data);

    var headlineArr = [];
    var urlArr = [];
    var summaryArr = [];

    var articleArr = [];

    $(".sc-3kpz0l-7").each(function(i, element) {
        var headline = $(element).text();
        var url = $(element).children().attr("href");

        headlineArr.push(headline);
        urlArr.push(url);
    });

    $(".sc-3kpz0l-6").each(function(i, element) {
        var summary = $(element).text();
        summaryArr.push(summary);
    });

    for (var i = 0; i < headlineArr.length; i++) {
        var headline = headlineArr[i];
        var url = urlArr[i];
        var summary = summaryArr[i];

        articleArr.push({
            headline: headline,
            url: url,
            summary: summary
        })
    };

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(articleArr);
});

//START THE SERVER - LISTEN TO REQUESTS
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});