const express = require("express");

const{postDiary}=require('../router/diary.js');

const diaryrRoute = express.Router();

diaryrRoute.post('/postdiary', postDiary);


module.exports = diaryrRoute; 