const Router = require("express").Router();

const AuthorModel = require("../../database/author");
// relative paths



/*
Route           /author 
Description     get  all  Authors
Access          PUBLIC
Parameters      a
Method          GET
*/
Router.get('/', async(req, res) => {
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
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GETs
*/

Router.get('/:isbn', async(req, res) => {
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
Route           /author/new
Description     add new Author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post('/new', async(req, res) => {
    const { newAuthor } = await req.body;
    // database.books.push(newBook)
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        authors: addNewAuthor,
        message: 'Author was added!'
    });
});

Router.put('/update/:id', async(req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.id,
    }, {
        name: req.body.authorName,
    }, {
        new: true,
    });


    // database.authors.forEach((author) => {
    //     if (author.id === req.params.id) {
    //         author.name = req.body.authorName
    //         return
    //     }
    // })
    return res.json({ authors: updatedAuthor, message: 'author is updated!' })
});

/*
Route           /author/delete
Description     delete a author
Access          PUBLIC
Parameters      id
Method          DELETE
*/
Router.delete(' /delete/:authId', async(req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findByIdAndDelete({
        id: req.params.authId,
    }, {
        new: true,
    });
    // const updatedAuthorDatabase = database.authors.filter((author) => author.id !== req.params.authId)

    // database.authors = updatedAuthorDatabase
    return res.json({ books: database.books, authors: database.authors, message: 'author was deleted!😪😪' })
});

module.exports = Router;