const query = require("../db/index.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { nanoid } = require("nanoid");

const QS=require('qs');

const {
    jwtSecretKey,
    expiresIn
} = require("../config.js");

exports.getCode = async (req, res) => {
    let userPhone = req.query;
    let selectUser = 'select * from users where phone=?';
    let arrRandom = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let code = '';
    try {
        let result = await query(selectUser, userPhone.phone);
        if (result.length > 0) {
            res.cc("用户已被占用！");
            return;
        }
        for (let i = 0; i < 6; i++) {
            let codeIndex = Math.floor(Math.random() * 6);
            code += arrRandom[codeIndex];
        }
        res.send({
            status: 0,
            message: "验证码是：",
            data: Number(code),
        })
    } catch (error) {
        res.cc(error);
    }
}

exports.register = async (req, res) => {
    let userInfo = req.body;
    if (!userInfo.phone || !userInfo.password) {
        res.send("用户信息错误,请重新填写！");
        return;
    }
    let selectUser = 'select * from users where phone=?';
    let insertUser = 'insert into users set ?';
    try {
        //查询用户
        let uResult = await query(selectUser, userInfo.phone);
        if (uResult.length > 0) {
            res.cc("用户已被占用！");
            return;
        }
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        //用户的初始化信息
        let user = {
            password: userInfo.password,
            phone: userInfo.phone,
            username: nanoid(),
            avatar: userInfo.avatar,
        }
        //插入注册的用户
        let result = await query(insertUser, user);
        if (result.affectedRows !== 1) {
            res.cc("用户注册失败！");
            return;
        }
        res.cc("注册成功！", 0);
    } catch (error) {
        res.cc(error);
    }
}

exports.login = async (req, res) => {
    let userInfo = req.body;
    if (!userInfo.phone || !userInfo.password) {
        res.send("用户信息错误,请重新填写！");
        return;
    }
    let selectUser = 'select * from users where phone=?';
    try {
        let result = await query(selectUser, userInfo.phone);
        if (result.length != 1) {
            res.cc("该用户不存在！");
            return;
        }
        let isPassword = bcrypt.compareSync(userInfo.password, result[0].password);
        if (!isPassword) {
            res.cc("登录密码错误！");
            return;
        }
        //token的生成与验证
        /* 通过扩展运算符展开对象，让后面的相同的属性覆盖前面的，
            置空password和user_avatar */
        let user = {
            ...result[0],
            password: '',
            avatar: ''
        }
        //对用户信息进行加密，生成token字符串
        let tokenUser = jwt.sign(user, jwtSecretKey, {
            expiresIn
        });
        //将token响应给客户端
        res.send({
            status: 0,
            message: "登录成功！",
            token: 'Bearer ' + tokenUser,
        })
    } catch (error) {
        res.cc(error);
    }
}

exports.loginOut = (req, res) => {
    res.send("ok");
}