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
                console.log(data.title);
                console.log(data.body);
                commentsArr.commentTitle.push(data.title);
                commentsArr.commentBody.push(data.body);
            });
        });
    })
    .then(() => {

        console.log(commentsArr);

        for (var i = 0; i < commentsArr.headline.length; i++) {

            $("#comments-section").append(
                `<div class="news-box">
            <a href='${commentsArr.url[i]}'><h2 class='news-headline'> ${commentsArr.headline[i]} </h2> </a>
            <h3>Comment: ${commentsArr.commentTitle[i]}</h3>
            <p class="summary">${commentsArr.commentBody[i]}</p>
            </div>`);
        };

    });