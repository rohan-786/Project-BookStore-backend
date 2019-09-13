const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const searchRoute = require('./Api/Routes/SearchModule/Search'); 

const {registerNewUser , authenticateUser} = require('../src/utility/auth');
app.use(bodyParser.urlencoded({ extended: false })) 

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

/**
 * User Defined Middleware 
 * 
 * checking user is logged in or not
 * 
 */

app.use('/auth-checking',(req,res,next)=>{
   let emailId = req.headers.emailid;
    let password = req.headers.password;
    console.log(emailId," ",password);
     authenticateUser(emailId , password)
     .then(response=>{
         response.value == true ? res.status(200).json({message:"user is present"}) : next();
     })
     .catch(err=>{
         console.error("!Invalid Query ",err);
     })
})
app.use('/new-user',(req,res,next)=>{
    let emailId = req.headers.emailid;
    let password = req.headers.password;
    console.log("new user",emailId," ",password);
    registerNewUser(emailId , password)
    .then(response=>{
        console.log(response);
        response.status == 200 ? res.status(200).json({message: 'user created successfully'}) : next(); 
    })
    .catch(err=>{
        console.log(err);
    })  
})

app.use('/Book',searchRoute);
app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})



module.exports = {app
};