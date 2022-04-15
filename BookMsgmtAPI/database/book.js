const mongoose = require("mongoose");

// create  a book schema 
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 10,
    }, //required
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publications: String,

});

// create a book model 
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;