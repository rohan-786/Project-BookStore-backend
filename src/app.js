const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {registerNewUser , authenticateUser} = require('../src/utility/auth');
const {checkAuthentication} = require('./utility/middleWare');
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

app.use((req,res)=>{
   let emailId = req.body.email_Id;
    let password = req.body.password;
    checkAuthentication(emailId,password); 
})
app.post("/auth-checking",(req,res)=>{
    let emailId = req.body.email_Id;
    let password = req.body.password;
    registerNewUser(emailId , password)
    .then(response=>{
        console.log(response);
    })
    .catch(err=>{
        console.log(err);
    })  
})

module.exports = {app
};