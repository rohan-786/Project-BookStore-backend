const {mysqlConnection}  = require('./app');

const getTableNames = {
    userLoginTable : "userLoginDB",
    bookTable: "bookDB"
}
const getDBConnection ={
    mysqlConnection:mysqlConnection
}




module.exports={
getDBConnection,
getTableNames
}
