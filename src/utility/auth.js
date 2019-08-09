const express = require('express');
const executeQuery = require('./service');

function isUserPresent(conn, emailId) {
    return (new Promise(function (resolve, reject) {
        const query = `SELET emailId from userLoginDB where emailId = ${emailId}`;
        executeQuery(conn, query)
            .then(response => response.json())
            .then(response => resolve({isUserExist: true , userData :response}))
            .catch(err => reject(false));
    }))

}

function registerNewUser(emailId, password) {
    return(new Promise(function(resolve,reject) {
        isUserPresent(conn,emailId)
        .then(response=>response.json())
        .then(response=> (response.isUserExist ? )
        .catch(err=>)
    }))
}

module.exports = {
    registerNewUser
}