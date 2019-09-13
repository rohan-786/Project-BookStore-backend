const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {isEmpty,createJsonResponse} = require('../../../utility/CommonFunction');
const {searchUserBook ,addNewBook} = require('./utility');

router.use(bodyParser.json());


router.get('/user/book',(req,res)=>{
    let searchParam = req.headers.book;
    if(isEmpty(searchParam)){
        res.status(400).json({message: "bad request. Insufficient params for search"});
    }

    searchUserBook(searchParam)
    .then(response=>{
        response.status === 200 ? 
        res.json({status: response.status, data : response.value}) :
        res.json({status: response.status, message : "Sorry no result found"})
    })
    .catch(err=>{
        console.log(err);
    })

})

router.post('/user/book',(req,res)=>{
     let id=req.body.id;
    // let author = req.body.author;
    // let authorId = req.body.authorId;
    // let authorBio = req.body.authorBio;
    let isbn = req.body.isbn;
    let contributorId = req.body.contributorId;
    let aboutBook = req.body.aboutBook;
    let bookName = req.body.bookName;
    

    if(isEmpty(id) || isEmpty(isbn) || isEmpty(contributorId) || isEmpty(aboutBook) || isEmpty(bookName)){
        res.status(400).json({message : "Bad Request!!! insufficient params for add New Book"});
    }

    addNewBook(req.body)
    .then(response=>{
        console.log(response);
    })
    .catch(err=>{
        console.error(err);
    })
})


module.exports=router;
