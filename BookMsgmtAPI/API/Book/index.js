// prefix : /book

// Initializing the Express Router 
const Router = require("express").Router();


// database model 
const BookModel = require("../../database/book")









/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE 
Method          GET
*/

Router.get('/', async(req, res) => {
    const getAllBooks = await BookModel.find();
    // console.log(getAllBooks);
    return res.json({ getAllBooks })
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

Router.get('/is/:isbn', async(req, res) => {
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

Router.get('/c/:category', async(req, res) => {

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
Router.get('/a/:authors', async(req, res) => {
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
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post('/new', async(req, res) => {
    const { newBook } = await req.body
    const addNewBook = BookModel.create(newBook);
    // database.books.push(newBook)
    return res.json({ books: addNewBook, message: 'book was added!' })
});


/*
Route           /book/update/
Description     update the title of book
Access          PUBLIC
Parameters      isbn
Method          POST
*/

Router.put('/update/:isbn', async(req, res) => {
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

Router.put('/author/update/:isbn', async(req, res) => {
    // update the  book database 
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        $addToSet: {
            authors: req.body.newAuthor,
        }
    }, {
        new: true,
    });


    // database.books.forEach((book) => {
    //         if (book.ISBN === req.params.isbn)
    //             return book.authors.push(req.body.newAuthor)
    //     })

    // update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
            id: req.body.newAuthor,
        }, {
            $addToSet: {
                books: req.params.isbn
            },
        }, {
            new: true,
        })
        // database.authors.forEach((author) => {
        //     if (author.id === req.body.newAuthor)
        //         return author.books.push(req.params.isbn)
        // })

    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: 'new author was added!💥'
    })
});


/*
Route           /book/delete
Description     delete a book 
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/



Router.delete('/delete/:isbn', async(req, res) => {
    const updateBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn,
    }, );


    // replace the whole object✅
    // edit at single point directly to master database
    // const updateBookDatabase = database.books.filter(
    //     (book) => book.ISBN !== req.params.isbn)

    // return new array
    // isbn
    // database.books = updateBookDatabase
    return res.json({ books: updateBookDatabase, message: "book is deleted!!" })
});

/*
Route           /book/delete/author
Description     delete a author from book
Access          PUBLIC
Parameters      isbn,author id
Method          DELETE
*/
Router.delete('/delete/author/:isbn/:authId', async(req, res) => {

    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $pull: {
            authors: req.params.authId,
        }
    }, {
        new: true,
    });

    // database.books.forEach((book) => {
    //         if (book.ISBN === req.params.isbn) {
    //             const newAuthorList = book.authors.filter(
    //                 (author) => author !== req.params.authId)
    //             book.authors = newAuthorList
    //             return
    //         }
    //     })
    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
            id: req.params.authId,
        }, {
            $pull: {
                books: req.params.isbn,
            }
        }, {
            new: true,
        })
        // database.authors.forEach((author) => {
        //     const newBookList = author.books.filter(
        //         (book) => book !== req.params.isbn
        //     )
        //     author.books = newBookList
        //     return
        // })
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: 'author was deleted😪😪'
    })
});





module.exports = Router;