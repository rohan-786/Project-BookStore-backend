const { executeQuery } = require('../../../utility/service');
const { isEmpty, createJsonResponse } = require('../../../utility/CommonFunction');
const { getTableNames } = require('../../../Common_Constant');
const table = getTableNames.bookTable;

function searchUserBook(book) {
    return (new Promise(function (resolve, reject) {
        const query = `select * from ${table} where bookName='${book}'`;
        executeQuery(query)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })

    }))
}

function addNewBook(bookData) {

    let { id = '', author = '', authorId = '', authorBio = '',
        isbn = '', contributorId = '', aboutBook = '', bookName = '' , bookCoverImage = '' } = bookData;
    return (new Promise(function (resolve, reject) {
        const query = `insert into bookDB (id, author,author_id , author_bio , isbn , contributor_id, about_book ,bookName , bookCoverImage) 
    values (${id},'${author}' ,  '${authorId}' , '${authorBio}','${isbn}' , '${contributorId}','${aboutBook}','${bookName}' ,'${bookCoverImage}')`;
        console.log(query);
        executeQuery(query)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    }))
}

module.exports = {
    searchUserBook,
    addNewBook
}