const express = require("express");

const { changeBgcolor, saveBgcolor, getBgcolor } = require('../router/bgcolor.js');

const bgcolorRoute = express.Router();

bgcolorRoute.post('/change', changeBgcolor);
bgcolorRoute.post('/save', saveBgcolor);
bgcolorRoute.get('/get', getBgcolor);


module.exports = bgcolorRoute;