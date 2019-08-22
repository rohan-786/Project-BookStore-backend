const { mysqlConnection } = require('../databases/mysqlConnection');
const { isEmpty, createJsonResponse } = require('./CommonFunction');

function executeQuery(sqlQuery) {
    return (new Promise(function (resolve, reject) {
        if (isEmpty(sqlQuery) || isEmpty(mysqlConnection)) {
            reject(createJsonResponse(400, 'Empty Query Request'))
        }
        mysqlConnection.query(sqlQuery, (err, result) => {
            if (err) {
                reject(createJsonResponse(400, "Invalid Query"));
            }
            !isEmpty(result) ? resolve(createJsonResponse(200, result)) : resolve(createJsonResponse(404, "Empty set return"));
        })
    }))
}

module.exports = {
    executeQuery
}

