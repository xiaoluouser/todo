const express=require("express");
const app=express();
const cors = require("cors");
//导入解析token的中间件，并在注册路由之前配置
const {
    expressjwt: jwt
} = require("express-jwt");

const {
    jwtSecretKey
} = require("./config.js");

const userRoute=require('./routes/user.js');
const userInfoRoute=require("./routes/userInfo.js");
const planRoute=require('./routes/plan.js');
const bgcolorRoute=require('./routes/bgcolor.js');
const diaryrRoute=require('./routes/diary.js');

//配置解析表单数据的中间件
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
})

//安装最新的版本的话，需要增加algorithms:['HS256'] 配置项，和serct同级
app.use(
    jwt({
        secret: jwtSecretKey,
        algorithms: ["HS256"],
        //使用.unless({ path: [/^\/api\//] })指定哪些接口不需要进行token的身份认证
    }).unless({
        path: [/^\/api/]
    })
);

//注册路由
app.use('/api', userRoute);
app.use('/my', userInfoRoute);
app.use('/plan',planRoute);
app.use('/bgcolor',bgcolorRoute);
app.use('/diary',diaryrRoute);

//定义错误级别中间件
app.use((err, req, res, next) => {
    //这是身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        res.cc("身份认证失败！");
        return;
    }
    //未知错误
    res.cc(err);
})

app.listen(3001,()=>{
    console.log('服务已开启,http://127.0.0.1:3001');
})