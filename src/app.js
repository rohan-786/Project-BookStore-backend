const express = require('express');
const app = express();
const Mysql =  require('mysql');

/** required the user define file */
const executeQuery = require('./utility/service');



const somepoint  = require('./Api/routes');

/** Creating the Mysql connection */
const conn = Mysql.createConnection({
    host: "localhost",
    user: "",
    password:"",
    database: "bookStoreDB"
})



app.use('/somepoint', somepoint);

module.exports = app;