const {mysqlConnection}  = require('./app');
const getTableNames = {
    userLoginTable : "userLoginDB"
}
const getDBConnection ={
    mysqlConnection:mysqlConnection
}


module.exports={
getDBConnection,
getTableNames
}
