const express = require("express");
const {
    postPlan,
    getAllPlan,
    getUndonePlan,
    getDonePlan,
    getMainPlan,
    updateCheckPlan,
    updateMainPlan,
    updateDeletePlan
} = require("../router/plan.js");

const planRoute = express.Router();

planRoute.post('/post', postPlan);
planRoute.get('/all', getAllPlan);
planRoute.get('/undone', getUndonePlan);
planRoute.post('/modcheck', updateCheckPlan);
planRoute.post('/moddelete', updateDeletePlan);
planRoute.post('/modmain', updateMainPlan);
planRoute.get('/getdone', getDonePlan);
planRoute.get('/getmain', getMainPlan);


module.exports = planRoute;