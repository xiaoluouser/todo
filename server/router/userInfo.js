const query = require("../db/index.js");

const bcrypt = require("bcryptjs");

//获取用户基本信息的处理函数
exports.getUserInfo = async (req, res) => {
    //console.log(req.auth) //这里通过req中的auth可以拿到解析后token的信息，而不是通过req中的user获取
    console.log(req);
    const userinfo = ['id', 'phone', 'username', 'avatar'];
    let selectUserInfo = `select ${userinfo} from users where id=?`;
    try {
        let result = await query(selectUserInfo, req.auth.id);
        //执行sql语句成功，但查询结果为空
        if (result.length != 1) {
            res.cc("获取用户信息失败！");
            return;
        }
        res.send({
            status: 0,
            message: "查询用户成功！",
            data: result[0],
        })
    } catch (error) {
        res.cc(error);
    }
}

//更新用户基本信息的处理函数
exports.updateUserInfo = async (req, res) => {
    let updateUser = 'update users set ? where id=?';
    try {
        const result =await query(updateUser, [req.body, req.auth.id]);
        if (result.changedRows != 1) {
            res.cc("修改用户信息失败！");
            return;
        }
        res.send({
            status: 0,
            message: "修改成功！",
            data: req.auth,
        });
    } catch (error) {
        res.cc(error);
    }
}