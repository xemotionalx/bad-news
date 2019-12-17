const mongoose = require('mongoose');
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app) {

    //SCRAPING THE ARTICLES WITH CHEERIO
    app.get("/scrape", function(req, res) {
        axios.get("https://theslot.jezebel.com/").then(function(response) {

            var $ = cheerio.load(response.data);

            var headlineArr = [];
            var urlArr = [];
            var summaryArr = [];

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

                var article = {
                    headline: headline,
                    url: url,
                    summary: summary
                };

                db.Article.create(article)
                    .then(function(dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            };

            res.send("Scrape Complete");
        });
    });


    // Route for getting all Articles from the db
    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function(dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for getting all Comments from the db
    app.get("/comments", function(req, res) {
        // Grab every document in the Articles collection
        db.Comment.find({})
            .then(function(dbComment) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbComment);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for grabbing a specific Comment by id
    app.get("/comments/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Comment.findOne({ _id: req.params.id })
            .then(function(dbComment) {
                // If we were able to successfully find an Comment with the given id, send it back to the client
                res.json(dbComment);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("comment")
            .then(function(dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for saving/updating an Article's associated Comment
    app.post("/articles/:id", function(req, res) {

        console.log(req.body);

        // Create a new Comment and pass the req.body to the entry
        db.Comment.create(req.body)
            .then(function(dbComment) {
                // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
                // { new: true } tells the query that we want it to return the updated Article -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(function(dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    app.post("/comments/:id", function(req, res) {

        console.log(req.body);
    });


}