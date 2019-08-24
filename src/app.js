const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {registerNewUser , authenticateUser} = require('../src/utility/auth');
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

app.use((req,res,next)=>{
   let emailId = req.body.email_Id;
    let password = req.body.password;
     authenticateUser(emailId , password)
     .then(response=>{
         response.value == true ? res.status(200).json({message:"user is present"}) : next();
     })
     .catch(err=>{
         console.error("!Invalid Query ",err);
     })
})
app.use((req,res,next)=>{
    let emailId = req.body.email_Id;
    let password = req.body.password;
    registerNewUser(emailId , password)
    .then(response=>{
        response.status == 200 ? res.status(200).json({message: 'user created successfully'}) : next(); 
    })
    .catch(err=>{
        console.log(err);
    })  
})

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