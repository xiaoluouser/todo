import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import PubSub from 'pubsub-js';
import {getCode, sendLogin, sendRegister} from '@/api/index.js';

import './LoginOrRegister.less';

function LoginOrRegister(props) {
    let { isShowPage, isShowLogin, isShowRegister } = props.isShow;
    let navigate = useNavigate();
    const closePage = () => {
        PubSub.publish("isShow", false);
    }
    let loginPhoneNode = useRef(null);
    let loginPasswordNode = useRef(null);
    const login =async () => {
        let phone = loginPhoneNode.current.value;
        let password = loginPasswordNode.current.value;
        let meg=(await sendLogin({phone,password})).data;
        if(meg.status===0){
            localStorage.setItem("token", JSON.stringify(meg.token));
            message.info(meg.message);
            navigate('/todo/home');
        }
    }
    let registerPhoneNode = useRef(null);
    let registerCodeNode = useRef(null);
    let registerPasswordNode = useRef(null);
    let registerOncePasswordNode = useRef(null);
    let [code,setCode]=useState(null);
    let [codeTime,setCodeTime]=useState(30);
    let [showCode,setShowCode]=useState(false);
    const sendCode=async ()=>{
        if(showCode)return;
        let phone=registerPhoneNode.current.value;
        if(!/^1[3-9]([0-9]{9})$/.test(phone)){
            return message.warn("手机号输入错误，请重新输入!");
        }
        setShowCode(true);
        let timer=setInterval(()=>{
            setCodeTime(codeTime--);
            if(codeTime<0){
                setCodeTime(30);
                setShowCode(false);
                clearInterval(timer);
            }
        },1000)
        let meg=(await getCode(phone)).data;
        if(meg.status===1){
            return message.warn(meg.message);
        }
        message.info(`验证码是：${meg.data}`);
        setCode(meg.data);
    }
    const register =async () => {
        let phone=registerPhoneNode.current.value;
        let password=registerPasswordNode.current.value;
        let oncePassword=registerOncePasswordNode.current.value;
        if(code!==Number(registerCodeNode.current.value)){
            return message.warn("验证码错误！");
        }
        if(password!==oncePassword){
            return message.warn("密码不相同，请重新输入！");
        }
        const userInfo={
            phone,
            password,
            avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
        let meg=(await sendRegister(userInfo)).data;
        message.info(meg.message);
        registerPhoneNode.current.value='';
        registerCodeNode.current.value='';
        registerPasswordNode.current.value='';
        registerOncePasswordNode.current.value='';
        PubSub.publish("isShow", false);
    }

    return (
        <>
            <div className="mask" style={isShowPage ? { display: 'block' } : {}}></div>
            <div className='all-box' style={isShowPage ? { transform: 'translate3d(0,0,0)' } : {}}>
                <span className='cancel' title='取消' onClick={closePage}>x</span>
                <div className='login-box'
                    style={isShowLogin ? { transform: 'translate3d(0,0,0)' } : { transform: 'translate3d(-100%,0,0)' }}>
                    <div className='title'>登录</div>
                    <div className='login-input'>
                        <input ref={loginPhoneNode} type="text" placeholder='请输入账号/手机号' required />
                        <input ref={loginPasswordNode} type="password" placeholder='请输入密码' required />
                        <button className='login-btn' onClick={login}>登录</button>
                    </div>
                </div>
                <div className='register-box'
                    style={isShowRegister ? { transform: 'translate3d(0,0,0)' } : { transform: 'translate3d(100%,0,0)' }}>
                    <div className='title'>注册</div>
                    <div className='register-input'>
                        <input ref={registerPhoneNode} type="text" placeholder='请输入手机号' required />
                        <input ref={registerCodeNode} type="text" className='code-input' placeholder='请输入验证码' required />
                        <button className='getCode' onClick={sendCode}>{showCode?`还有${codeTime}s`:'获取验证码'}</button>
                        <input ref={registerPasswordNode} type="password" placeholder='请输入密码' required />
                        <input ref={registerOncePasswordNode} type="password" placeholder='再次确认密码' required />
                        <button className='register-btn' onClick={register}>注册</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginOrRegister;