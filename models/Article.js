var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    // `comment` is an object that stores a comment id
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with the associated comment
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;