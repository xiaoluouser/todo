const express = require("express");

const {
    getUserInfo,
    updateUserInfo
} = require("../router/userInfo.js");
const userInfoRoute = express.Router();


userInfoRoute.get('/userinfo',getUserInfo);
userInfoRoute.post('/moduserinfo',updateUserInfo);

module.exports = userInfoRoute;