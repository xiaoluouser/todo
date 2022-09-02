const express = require("express");
const userRoute = express.Router();
const {
    getCode,
    register,
    login,
    loginOut
} = require('../router/user.js');

userRoute.get('/getcode', getCode);
userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.get('/loginout', loginOut);

module.exports = userRoute; 