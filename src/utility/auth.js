const express = require('express');
const  {executeQuery}  = require('./service');
const { isEmpty, createJsonResponse } = require('./CommonFunction');
const { getTableNames } = require("../Common_Constant");
const table = getTableNames.userLoginTable;

function isUserPresent(emailId) {
    return (new Promise(function (resolve, reject) {
        const query = `select * from ${table} where Email_Id='${emailId}'`;
        executeQuery(query)
            .then(response => {
                response.status == 200 ? resolve(createJsonResponse(200, true)) : resolve(createJsonResponse(200,false))
            })
            .catch(err => {
                reject(createJsonResponse(400,err));
            })
    }))

}

function authenticateUser(emailId , password) {
    return (new Promise(function(resolve , reject) {

        const query = `select * from ${table} where Email_Id='${emailId}' and password='${password}'`;
        executeQuery(query)
            .then(response=>{
                response.status == 200 ? resolve(createJsonResponse(200 , true)) : resolve(createJsonResponse(200,false))
            })
            .catch((err=>{
                reject(createJsonResponse(400,err));
            }))
        
    }))
}

function registerNewUser(emailId, password) {
    return (new Promise(function (resolve, reject) {
            isUserPresent(emailId)
            .then(response=>{
                response.value == true ? reject(createJsonResponse(422,"User name is already present")) 
                : resolve(createUserAccount(emailId,password))
            })
            .catch(err=>{
                reject(createJsonResponse(500,`Internal server error! Error ==>${err}`));
            })
    }))
}

function createUserAccount(emailId, password) {
    return (new Promise(function (resolve, reject) {
        if (isEmpty(emailId) || isEmpty(password)) {
            reject({ status: "400", message: "Unable to create User. Kindly provide emailId and Password correctly" });
        }

        const query = `insert into ${table} (Email_Id,password) values('${emailId}','${password}')`;
        executeQuery(query)
            .then(response => {
                response.status == 200 ? resolve(createJsonResponse(200, 'User created Successfully')) :
                 reject(createJsonResponse(422, "Due to some problem can't create user"))
            })
            .catch(err => {
                reject(err);
            })


    }))
}

module.exports = {
    registerNewUser,
    authenticateUser
}
