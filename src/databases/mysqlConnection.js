
const Mysql =  require('mysql');

/** Creating the Mysql connection */
const mysqlConnection = Mysql.createConnection({
    host: "localhost",
    user: "",
    password:"",
    database: "bookStoreDB"
})

console.log("Mysql Connection Established");

module.exports = {mysqlConnection};