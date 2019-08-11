const express = require('express');
const mysqlConnection  =  require('./databases/mysqlConnection');
const app = express();
const bodyParser = require('body-parser');
const {registerNewUser} = require('../src/utility/auth');

app.use(bodyParser.urlencoded({ extended: false })) 

// parse application/json
app.use(bodyParser.json())

app.use(express.json());

/**
 * User Defined Middleware 
 * 
 * checking user is logged in or not
 * 
 */

app.post("/auth-checking",(req,res)=>{
    let emailId = req.body.email_Id;
    let password = req.body.password;
    registerNewUser(emailId , password)
    .then(response =>response.json())
    .then(response=>{
        if(response.status == 200){
            console.log(response.message);
        }
    })
    .catch(err=>{
        console.log(err);
    })  
})

module.exports = {app,
mysqlConnection
};