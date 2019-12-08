var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");
var hbs = require("express-handlebars");
var mongoose = require("mongoose");

var app = express();

console.log("\n***********************************\n" +
    "Grabbing every thread title\n" +
    "from jezebel's the slot:" +
    "\n***********************************\n");

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