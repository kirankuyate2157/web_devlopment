// frame  work
const express = require("express");
const res = require("express/lib/response");

// database
const database = require("./database/index")

// initializing the express
const rennzon = express();

// configurations 
rennzon.use(express.json());

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/

rennzon.get("/", (req, res) => {
    return res.json({ books: database.books });
});


/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/


rennzon.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
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

rennzon.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter((book) =>
        book.category.includes(req.params.category)
    );

    if (getSpecificBooks.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({ books: getSpecificBooks });
});

/*
Route           /a
Description     get specific books based on Author
Access          PUBLIC
Parameters      author
Method          GET
*/
rennzon.get("/a/:authors", (req, res) => {
    const getSpecificBooks = database.books.filter((book) =>
        book.authors.includes(req.params.authors)
    );

    if (getSpecificBooks.length === 0) {
        return res.json({
            error: `No book found for the authors of ${req.params.authors}`,
        });
    }
    return res.json({ books: getSpecificBooks });
});

/*
Route           /author 
Description     get  all  Authors
Access          PUBLIC
Parameters      a
Method          GET
*/
rennzon.get("/authors", (req, res) => {
    return res.json({ authors: database.authors });
});

/*
Route           /author
Description     get specific  Author by id
Access          PUBLIC
Parameters      id
Method          GET
*/
rennzon.get("/publication/:id", (req, res) => {
    const getSpecificPublication = database.publications.filter((publication) =>
        publication.id.includes(req.params.id)
    );
    if (getSpecificPublication.length === 0) {
        return res.json({
            error: `No publication found for the id  ${req.params.id}`,
        });
    }
    return res.json({ publications: getSpecificPublication });
});

/*
Route           /author
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

rennzon.get("/author/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter((author) =>
        author.books.includes(req.params.isbn)
    );
    if (getSpecificAuthors.length === 0) {
        return res.json({
            error: `No author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({ authors: getSpecificAuthors });
});

/*
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
rennzon.get("/publications", (req, res) => {
    return res.json({ publication: database.publications });
});


/*
Route           /publication
Description     get all publications
Access          PUBLIC
Parameters      id
Method          GET
*/


rennzon.get("/publication/:id", (req, res) => {
    const getSpecificAuthors = database.authors.filter((publication) =>
        publication.id.includes(req.params.id)
    );
    if (getSpecificAuthors.length === 0) {
        return res.json({
            error: `No publication found for the id  ${req.params.id}`,
        });
    }
    return res.json({ authors: getSpecificAuthors });
});

/*
Route           /pub
Description     get all publications
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

rennzon.get("/pub/:isbn", (req, res) => {
    const getSpecificpublication = database.publications.filter((publication) =>
        publication.books.includes(req.params.isbn)
    );
    if (getSpecificpublication.length === 0) {
        return res.json({
            error: `No publication found for the book ${req.params.isbn}`,
        });
    }
    return res.json({ publications: getSpecificpublication });
});



// rennzon.get("/pub/:isbn", (req, res) => {
//     const getSpecificPublication = database.authors.filter((publication) =>
//         publication.books.includes(req.params.books)
//     );
//     if (getSpecificPublication.length === 0) {
//         return res.json({
//             error: `No publication found for the book isbn  ${req.params.books}`,
//         });
//     }
//     return res.json({ publications: getSpecificPublication });
// });









rennzon.listen(3000, () => console.log("Server is running !!⏳⏳ "));