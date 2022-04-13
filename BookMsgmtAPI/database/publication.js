const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
    id: String,
    name: String,
    books: [String],
});
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;