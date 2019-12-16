const commentsArr = {
    headline: [],
    url: [],
    id: [],
    commentId: [],
    commentTitle: [],
    commentBody: [],
}

$.getJSON("/articles", function(data) {
        return data;

    })
    .then(function(result) {

        result.forEach((article) => {
            if (article.comment) {
                commentsArr.headline.push(article.headline);
                commentsArr.url.push(article.url);
                commentsArr.id.push(article._id);
                commentsArr.commentId.push(article.comment);
            }
        });

    })
    .then(() => {
        commentsArr.commentId.forEach((comment) => {
            $.getJSON("/comments/" + comment, function(data) {
                commentsArr.commentTitle.push(data.title);
                commentsArr.commentBody.push(data.body);
            });
        });
    })
    .then(() => {
        console.log(commentsArr);
    });


/*
$("#comments-section").append(`<div class="news-box">
        <a href='${article.url}'><h2 data-id='${article._id}' class='news-headline'> ${article.headline} </h2> </a>
        <p class="summary">${article.summary}</p>
        </div>`);
        */