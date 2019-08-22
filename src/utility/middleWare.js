const {registerNewUser , authenticateUser} = require('./auth');
const {isEmpty , createJsonResponse} = require('./CommonFunction');
var checkAuthentication = function(req,res,next,emaiId, password){
    authenticateUser(emaiId , password)
    .then(response=>{
        response.value == true ? next() : reject(createJsonResponse(400,"Invalid user name or password"))
    })
    .catch(err=>{
        console.error(err);
    })
}; 
    
module.exports={
    checkAuthentication
}