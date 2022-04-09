const books = [{
        ISBN: '1234SOME',
        title: 'Getting started with MERN',
        authors: ['1', ' 2', '3'],
        language: 'en',
        pubDate: '2022-4-08',
        numOfPage: 255,
        category: ['friction', 'tech', 'Web Dev'],
        publications: 1

    },
    {
        ISBN: '1234SO322',
        title: 'Getting started with python...',
        authors: ['5', ' 2', '3'],
        language: 'en',
        pubDate: '2022-4-08',
        numOfPage: 255,
        category: ['friction', 'programing', 'tech', 'Web Dev'],
        publications: 1

    }
]
const authors = [{
        id: '1',
        name: 'kiran',
        books: ['1234SOME', '1234SO322']
    },
    {
        id: '2',
        name: 'kartik',
        books: ['1234SOME']
    },
    {
        id: '3',
        name: 'Druv',
        books: ['1234SOME']
    }

]
const publications = [{
    id: '1',
    name: 'Navneet',
    books: ['1234SOME']

}]

module.exports = { books, authors, publications };