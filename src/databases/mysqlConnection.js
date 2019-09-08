
const Mysql =  require('mysql');

/** Creating the Mysql connection */
const mysqlConnection = Mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "BookOverFlow"
})
mysqlConnection.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connection Established");  
})

module.exports = {mysqlConnection};