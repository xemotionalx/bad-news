//when the 'new news' button is clicked, articles are scraped and the title/headlines are displayed on the page
$("#new-news-btn").on("click", function() {
    $.getJSON("/articles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#news-section").append(`<div class="news-box">
            <a href='${data[i].url}'><h2 data-id='${data[i]._i}' class='news-headline'> ${data[i].headline} </h2> </a>
            <p class="summary">${data[i].summary}</p>
            </div>
            <div class="comment-box">
            <input id='titleinput' class='titleinput' name='title' placeholder="comment title"><br>
            <textarea id='bodyinput' class='bodyinput' name='body' placeholder="write your comment here"></textarea><br>
            <button data-id='${data[i]._id}' id='savenote'>Save Comment</button>
            </div>
            `);
        }
    });
});


$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    console.log(thisId);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});