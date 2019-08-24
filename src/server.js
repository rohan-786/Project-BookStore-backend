const {app} = require('./app');
const port = 3333;


/** start node server */

app.listen(port,(err)=>{
    if(err) return console.error(err);
    return console.info(`Server running on port ${port}`);
})


