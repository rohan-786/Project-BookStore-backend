const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json());

app.use(cors());

let jsonData = require('../TestJSON.json');
const { getUserInfo, getUserActivityData } = require('./utility/commonUtils');

app.use('/get-userinfo', (req, res) => {
    try {
        const userInfo = getUserInfo(jsonData);
        res.status(200).json(userInfo);
    } catch (error) {
        console.error("[ERROR] issue generate while processing on data", err);
    }
})

app.use('/get-user-activity', (req, res) => {
    try {
        let searchId = req.headers.id;
        if (!searchId) throw new Error("Search Id Missing");
        const userActivityInfo = getUserActivityData(searchId, jsonData);
        res.status(200).json(userActivityInfo);
    } catch (e) {
        console.error("[ERROR]", err);
    }
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports = {
    app
};