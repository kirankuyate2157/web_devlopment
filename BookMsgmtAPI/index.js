require("dotenv").config(); //for private data security purpose
// frame  work
const express = require('express')

const mongoose = require('mongoose');

// Microservice Router
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");
// initializing the express
const rennzon = express();

// configurations 
rennzon.use(express.json());

// Establish database connection 
mongoose.connect(process.env.MONGO_URL).then(() => console.log('connection established ...!!!!'));

// Initializing microservice
rennzon.use("/book", Books);
rennzon.use("/publication", Publications);
rennzon.use("/author", Authors)


rennzon.listen(3000, () => console.log('Server is running !!⏳⏳ '));





// Talk to mongoDB in which mongoDB understand => *************
// talk to us in the way we understand  => Javascript
// mongoose

// model  -> document model of mongoDB
// Schema -> Model ->use them


// why schema?

// mongoDB is schemaless

// mongoose helps you with validation,relationship with other data ->mongoDb  44