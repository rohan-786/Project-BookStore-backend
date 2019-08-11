const conn = require('./app');
const getTableNames = {
    userLoginTable : "userLoginDB"
}
const getDBConnection ={
    mysqlConnection:conn
}


module.exports={
getDBConnection,
getTableNames
}
