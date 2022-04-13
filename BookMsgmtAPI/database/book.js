const mongoose = require("mongoose");

// create  a book schema 
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publications: String,

});

// create a book model 
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;