require("dotenv").config(); //for private data security purpose
// frame  work
const express = require('express')

const mongoose = require('mongoose');


// database
const database = require('./database/index');

// models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// initializing the express
const rennzon = express();

// configurations 
rennzon.use(express.json());

// Establish database connection 
mongoose.connect(process.env.MONGO_URL).then(() => console.log('connection established ...!!!!'));

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE 
Method          GET
*/

rennzon.get('/', async(req, res) => {
    const getAllBooks = await BookModel.find();
    // console.log(getAllBooks);
    return res.json({ getAllBooks })
});
``

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

rennzon.get('/is/:isbn', async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
    //if mongodb not find data return null-> false

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`
        })
    }
    return res.json({ book: getSpecificBook })
});

/*
Route           /c
Description     get specific books based on category
Access          PUBLIC
Parameters      category
Method          GET
*/

rennzon.get('/c/:category', async(req, res) => {

    const getSpecificBook = await BookModel.findOne({ category: req.params.category, });
    // const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category))

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`
        })
    }
    return res.json({ books: getSpecificBook })
});

/*
Route           /a
Description     get specific books based on Author
Access          PUBLIC
Parameters      author
Method          GET
*/
rennzon.get('/a/:authors', async(req, res) => {
    const getSpecificBooks = await BookModel.findOne({ authors: req.params.authors })
        // const getSpecificBooks = database.books.filter((book) => book.authors.includes(req.params.authors))

    if (!getSpecificBooks) {
        return res.json({
            error: `No book found for the authors of ${req.params.authors}`
        })
    }
    return res.json({ books: getSpecificBooks })
});

/*
Route           /author 
Description     get  all  Authors
Access          PUBLIC
Parameters      a
Method          GET
*/
rennzon.get('/authors', async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    if (!getAllAuthors) {
        return res.json({
            error: `No publication found `
        })
    }
    return res.json({ authors: getAllAuthors });
});

/*
Route           /author
Description     get specific  Author by id
Access          PUBLIC
Parameters      id
Method          GET
*/
rennzon.get('/publication/:id', async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ id: req.params.id })
        // const getSpecificPublication = database.publications.filter((publication) => publication.id.includes(req.params.id))
    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id  ${req.params.id}`
        })
    }
    return res.json({ publications: getSpecificPublication })
});

/*
Route           /author
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GETs
*/

rennzon.get('/author/:isbn', async(req, res) => {
    const getSpecificAuthors = await AuthorModel.findOne({ books: req.params.isbn })
        // const getSpecificAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn))
    if (!getSpecificAuthors) {
        return res.json({
            error: `No author found for the book ${req.params.isbn}`
        })
    }
    return res.json({ authors: getSpecificAuthors })
});

/*
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
rennzon.get('/publications', async(req, res) => {
    const getAllPublication = await PublicationModel.find()
    if (!getAllPublication) {
        return res.json({
            error: `No publication found `
        })
    }
    return res.json({ publications: getAllPublication })
});

/*
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      id
Method          GET
*/

rennzon.get('/publication/:id', async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ id: req.params.id })
        // const getSpecificPublication = database.authors.filter((publication) => publication.id.includes(req.params.id))
    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id  ${req.params.id}`
        })
    }
    return res.json({ publications: getSpecificPublication })
});

/*
Route           /pub
Description     get all publications
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

rennzon.get('/pub/:isbn', async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ books: req.params.isbn })
        // const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(req.params.isbn))
    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the book ${req.params.isbn}`
        })
    }
    return res.json({ publications: getSpecificPublication })
});

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
rennzon.post('/book/new', async(req, res) => {
    const { newBook } = await req.body
    const addNewBook = BookModel.create(newBook);
    // database.books.push(newBook)
    return res.json({ books: addNewBook, message: 'book was added!' })
});

/*
Route           /author/new
Description     add new Author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
rennzon.post('/author/new', async(req, res) => {
    const { newAuthor } = await req.body;
    // database.books.push(newBook)
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        authors: addNewAuthor,
        message: 'Author was added!'
    });
});

/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/

rennzon.post('/publication/new', async(req, res) => {
    const { newPublication } = await req.body
        // database.publications.push(newPublication)
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        publications: addNewPublication,
        message: 'publication was added!'
    })
});
/*
Route           /book/update/
Description     update the title of book
Access          PUBLIC
Parameters      isbn
Method          POST
*/

rennzon.put('/book/update/:isbn', async(req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        title: req.body.bookTitle,
    }, {
        new: true,
    });

    // forEach directly modifies the array 
    // map => new array => replace
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title = req.body.bookTitle
    //         return
    //     }
    // })
    return res.json({ books: updatedBook, message: 'book title updated!' })
});

/*
Route           /book/author/update/:isbn
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

rennzon.put('/book/author/update/:isbn', (req, res) => {
    // update the  book database 
    database.books.forEach((book) => {
            if (book.ISBN === req.params.isbn)
                return book.authors.push(req.body.newAuthor)
        })
        // update author database
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthor)
            return author.books.push(req.params.isbn)
    })

    return res.json({
        books: database.books,
        authors: database.authors,
        message: 'new author was added!💥'
    })
});

/*
Route           /author
Description     update/add author name/details
Access          PUBLIC
Parameters      id
Method          PUT
*/
rennzon.put('/author/update/:id', (req, res) => {
    database.authors.forEach((author) => {
        if (author.id === req.params.id) {
            author.name = req.body.authorName
            return
        }
    })
    return res.json({ authors: database.authors, message: 'author is updated!' })
});

/*
Route           /publication/update
Description     update/add publication name/details
Access          PUBLIC
Parameters      id
Method          PUT
*/

rennzon.put('/publication/update/:id', (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.id === req.params.id) {
            publication.name = req.body.publicationName

            return
        }
    })
    return res.json({ publications: database.publications, message: 'publication name updated!' })
});

/*
Route           /publication/update/book
Description     update/add new book to a publication 
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

rennzon.put('/publication/update/book/:isbn', (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn)
        }
    })

    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId
            return
        }
    })

    return res.json({
        books: database.books,
        publications: database.publications,
        message: 'publication book updated!'
    })
});

/*
Route           /book/delete
Description     delete a book 
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

rennzon.delete('/book/delete/:isbn', (req, res) => {
    // replace the whole object✅
    // edit at single point directly to master database
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn)

    // return new array
    // isbn
    database.books = updateBookDatabase
    return res.json({ books: database.books })
});

/*
Route           /book/delete/author
Description     delete a author from book
Access          PUBLIC
Parameters      isbn,author id
Method          DELETE
*/
rennzon.delete('/book/delete/author/:isbn/:authId', (req, res) => {
    database.books.forEach((book) => {
            if (book.ISBN === req.params.isbn) {
                const newAuthorList = book.authors.filter(
                    (author) => author !== req.params.authId)
                book.authors = newAuthorList
                return
            }
        })
        // update the author database
    database.authors.forEach((author) => {
        const newBookList = author.books.filter(
            (book) => book !== req.params.isbn
        )
        author.books = newBookList
        return
    })
    return res.json({
        book: database.books,
        author: database.authors,
        message: 'author was deleted😪😪'
    })
});

/*
Route           /publication/delete/book
Description     delete a book form publication
Access          PUBLIC
Parameters      isbn,publication id
Method          DELETE
*/

rennzon.delete('/publication/delete/book/:isbn/:pubId', (req, res) => {
    // update publication database 
    database.publications.forEach((publication) => {
            if (publication.id === req.params.pubId) {
                const newBookList = publication.books.filter(
                    (book) => book !== req.params.isbn
                )
                publication.books = newBookList
                return
            }
        })
        // update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = '0' // no publication available
            return
        }
    })
    return res.json({
        books: database.books,
        publications: database.publications

    })
})

/*
Route           /author/delete
Description     delete a author
Access          PUBLIC
Parameters      id
Method          DELETE
*/
rennzon.delete('/author/delete/:authId', (req, res) => {
    const updatedAuthorDatabase = database.authors.filter((author) => author.id !== req.params.authId)

    database.authors = updatedAuthorDatabase
    return res.json({ books: database.books, authors: database.authors, message: 'author was deleted!😪😪' })
})

/*
Route           /publication/delete
Description     delete a publication
Access          PUBLIC
Parameters      id
Method          DELETE
*/

rennzon.delete('/publication/delete/:id', (req, res) => {
    const updatePublicationList = database.publications.filter((publication) => publication.id !== req.params.id)
    database.publications = updatePublicationList
    return res.json({ publications: database.publications, message: 'publication was deleted!😪😪' })
});

rennzon.listen(3000, () => console.log('Server is running !!⏳⏳ '));





// Talk to mongoDB in which mongoDB understand => *************
// talk to us in the way we understand  => Javascript
// mongoose

// model  -> document model of mongoDB
// Schema -> Model ->use them


// why schema?

// mongoDB is schemaless

// mongoose helps you with validation,relationship with other data ->mongoDb  44