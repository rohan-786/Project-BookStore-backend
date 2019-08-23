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
app.post("/auth-checking",(req,res)=>{
    let emailId = req.body.email_Id;
    let password = req.body.password;
    registerNewUser(emailId , password)
    .then(response=>{
        if(response.status == 200)res.status(200).json({message: 'user created successfully'}) 
    })
    .catch(err=>{
        console.log(err);
    })  
})

module.exports = {app
};