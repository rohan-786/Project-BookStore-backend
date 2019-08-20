const getDBConnection = require("../Common_Constant");
const promises = require('es6-promise').Promise;


const con = getDBConnection.mysqlConnection;


function executeQuery(sqlQuery) {
    return (new Promise(function (resolve, reject) {
        if (isEmpty(con) || isEmpty(sqlQuery)) {
            reject({ status: "400", message: "Unable to process Further. Due to insufficient params" });
        }
        con.query(sqlQuery, args, (err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                reject({ status: "404", message: "Sorry Unable to Found might be problem with Query" });
            }
            resolve({ status: "200", data: result });
        })
    }));
}

function isEmpty(value) {
    if (typeof value == 'undefined' || typeof value == null) {
        return true;
    }
    else if (typeof value == Object) {
        if (Array.isArray(value)) {
            return value.length > 0 ? false : true;
        } else {
            return Object.keys(value).length > 0 ? false : true;
        }
    }
    else if (typeof value == String) {
        return value.length > 0 ? false : true;
    }
    return false;
}


module.exports = {
    executeQuery,
    isEmpty
}