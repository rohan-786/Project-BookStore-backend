const express = require('express');
const app = express();
const App = require('./app');
const port = 3333;


/** start node server */

app.listen(port,App,(err)=>{
    if(err) return console.error(err);
    return console.info(`Server running on port ${port}`);
})


