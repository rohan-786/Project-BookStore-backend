const express = require('express');
const router = express.Router();

const app = new express();
const port = 3333;



app.listen(port ,(err)=>{
    if(err) return console.error(err);
    return console.info(`Server running on port ${port}`);
})


module.exports = router;