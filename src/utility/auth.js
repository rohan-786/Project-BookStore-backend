const express = require('express');
const {executeQuery} = require('./service');
const isEmpty = require('./service');
const { getTableNames} = require("../Common_Constant") ;
const Promise = require('es6-promise').Promise;

function isUserPresent(emailId) {
    return (new Promise(function (resolve, reject) {
        const query = `select * from userLoginDB where Email_Id = '${emailId}'`;
        console.log(query);
        executeQuery(query)
            .then(response => response.json())
            .then(response => {
                if (response.status == "200") resolve({ isUserExist: true });
            })
            .catch(err => {
                reject({ isUserExist: false })
            })
    }))

}

function registerNewUser(emailId, password) {
    return (new Promise(function (resolve, reject) {
        
        isUserPresent(emailId)
            .then(response => response.json())
            .then(response => {
                response.isUserExist ? reject({ status: 422, message: "Unable to create account .Account is already exist" }) :
                    resolve(createUserAccount(emailId, password))
            })
            .catch(err => reject({ status: 500, message: `Internal server Error! ${err}` }));
    }))
}

function createUserAccount(emailId, password) {
    return (new Promise(function (resolve, reject) {
        if (isEmpty(emailId) || isEmpty(password)) {
            reject({ status: "400", message: "Unable to create User. Kindly provide emailId and Password correctly" });
        }

        const table = getTableNames.userLoginTable;
        const query = `INSERT INTO ${table}(Email_Id,password) VALUES(${emailId},${password})`;
        executeQuery(query)
            .then(response => response.json())
            .then(response => {
                if (response.status == "200") resolve({ status: "200", message: "User created successfully" });
            })
            .catch(err => {
                reject(err);
            })


    }))
}

module.exports = {
    registerNewUser
}