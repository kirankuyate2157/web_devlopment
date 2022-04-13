const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    id: String,
    name: String,
    books: [String]

});
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;