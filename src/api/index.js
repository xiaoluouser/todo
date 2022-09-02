import requests from "./request.js";
import QS from 'qs';

//将经纬度转换为位置名称
export const getPosition = (longitude, latitude) => {
    return requests.get(`https://restapi.amap.com/v3/geocode/regeo?key=6781815cf17ec3fb68dfc4e10ceeaa9d&location=${longitude},${latitude}`);
}
//获取高德天气
export const getWeather = (adcode) => {
    return requests.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=6781815cf17ec3fb68dfc4e10ceeaa9d&extensions=base&city=${adcode}`);
}

//获取验证码
export const getCode = (phone) => {
    return requests.get(`/api/getcode?phone=${phone}`);
}

//注册
export const sendRegister = (userInfo) => {
    return requests.post('/api/register', QS.stringify(userInfo));
}

//登录
export const sendLogin = (userInfo) => {
    return requests.post('/api/login', QS.stringify(userInfo));
}

//获取用户信息
export const getUserInfo = () => {
    return requests.get('/my/userinfo');
}

//存储背景颜色
export const saveBgcolor = (colorInfo) => {
    return requests.post('/bgcolor/save', QS.stringify(colorInfo));
}

//切换背景颜色
export const changeBgcolor = (colorInfo) => {
    return requests.post('/bgcolor/change', QS.stringify(colorInfo));
}

//获取背景颜色
export const getBgcolor = (area) => {
    return requests.get(`/bgcolor/get?area=${area}`);
}

//创建计划
export const postPlan = (plan) => {
    return requests.post('/plan/post', QS.stringify(plan));
}

//获取所有的计划
export const getAllPlan = () => {
    return requests.get('/plan/all');
}

/* //获取未完成的计划
export const getUndonePlan = () => {
    return requests.get('/plan/undone');
} */

//勾选计划是否完成
export const checkPlans = (info) => {
    return requests.post('/plan/modcheck', QS.stringify(info));
}

//删除计划
export const deletePlans = (info) => {
    return requests.post('/plan/moddelete', QS.stringify(info));
}

//勾选重要计划
export const mainPlans = (info) => {
    return requests.post('/plan/modmain', QS.stringify(info));
}

/* //获取完成的计划
export const getDonePlan = () => {
    return requests.get('/plan/getdone');
} */


