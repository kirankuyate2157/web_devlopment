const Router = require("express").Router();

const BookModel = require("../../database/book");
const PublicationModel = require("../../database/publication");




/*
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get('/', async(req, res) => {
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
Description     get specific  Author by id
Access          PUBLIC
Parameters      id
Method          GET
*/
Router.get('/:id', async(req, res) => {
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
Route           /pub
Description     get publications by isbn
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

Router.get('/:isbn', async(req, res) => {
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
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/

Router.post('/new', async(req, res) => {
    const { newPublication } = await req.body
        // database.publications.push(newPublication)
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        publications: addNewPublication,
        message: 'publication was added!'
    })
});

/*
Route           /publication/update
Description     update/add publication name/details
Access          PUBLIC
Parameters      id
Method          PUT
*/

Router.put('/update/:id', async(req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.params.id,
    }, {
        name: req.body.publicationName,
    }, {
        new: true,
    });

    // database.publications.forEach((publication) => {
    //     if (publication.id === req.params.id) {
    //         publication.name = req.body.publicationName

    //         return
    //     }
    // })
    return res.json({ publications: updatedPublication, message: 'publication name updated!' })
});

/*
Route           /publication/update/book
Description     update/add new book to a publication 
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

Router.put('/update/book/:isbn', async(req, res) => {
    // update the publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.body.pubId,
    }, {
        $addToSet: {
            books: req.params.isbn,
        }
    }, {
        new: true,
    });
    // database.publications.forEach((publication) => {
    //     if (publication.id === req.body.pubId) {
    //         return publication.books.push(req.params.isbn)
    //     }
    // })

    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        publications: req.body.pubId
    }, {
        new: true,
    })

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = req.body.pubId
    //         return
    //     }
    // })

    return res.json({
        books: updatedBook,
        publications: updatedPublication,
        message: 'publication book updated!'
    })
});



/*
Route           /publication/delete/book
Description     delete a book form publication
Access          PUBLIC
Parameters      isbn,publication id
Method          DELETE
*/

Router.delete('/delete/book/:isbn/:pubId', async(req, res) => {
    // update publication database 
    const updatePublication = await PublicationModel.findOneAndUpdate({
        id: req.params.pubId,
    }, {
        $pull: {
            books: req.params.isbn,
        }
    }, {
        new: true,
    });

    // database.publications.forEach((publication) => {
    //         if (publication.id === req.params.pubId) {
    //             const newBookList = publication.books.filter(
    //                 (book) => book !== req.params.isbn
    //             )
    //             publication.books = newBookList
    //             return
    //         }
    //     })
    // update book database

    const updatedBook = await BookModel.findOneAndUpdate({
            ISBN: req.params.isbn,
        }, {
            publications: "0",
        })
        // database.books.forEach((book) => {
        //     if (book.ISBN === req.params.isbn) {
        //         book.publication = '0' // no publication available
        //         return
        //     }
        // })
    return res.json({
        books: updatedBook,
        publications: updatePublication
    })
});


/*
Route           /publication/delete
Description     delete a publication
Access          PUBLIC
Parameters      id
Method          DELETE
*/

Router.delete('/delete/:id', async(req, res) => {
    const updatePublicationDatabase = await PublicationModel.findByIdAndDelete({
        id: req.params.id,
    }, {
        new: true,
    });
    // const updatePublicationList = database.publications.filter((publication) => publication.id !== req.params.id)
    // database.publications = updatePublicationList
    return res.json({ publications: updatePublicationDatabase, message: 'publication was deleted!😪😪' })
});



module.exports = Router;