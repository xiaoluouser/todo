import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import LoginOrRegister from '@/components/LoginOrRegister/LoginOrRegister.jsx';

import logo from '@/assets/logo.png'
import homeLeft from '@/assets/welcome-left.png';
import homeRight from '@/assets/welcome-right.png';
import './WelcomePage.less';
import hocAuthWelcomePage from '@/components/hocAuthWelcomePage';

function WelcomePage(props) {
  let [isShow, setIsShow] = useState({
    isShowPage: false,
    isShowLogin: false,
    isShowRegister: false
  });
  const toLogin = () => {
    setIsShow({
      isShowPage: true,
      isShowLogin: true,
      isShowRegister: false
    });
  }
  const toRegister = () => {
    setIsShow({
      isShowPage: true,
      isShowLogin: false,
      isShowRegister: true
    });
  }
  useEffect(() => {
    PubSub.subscribe("isShow", (_, data) => {
      setIsShow({
        isShowPage: data,
        isShowLogin: false,
        isShowRegister: false
      });
    })
  })
  return (
    <div className='welcome-page'>
      <img src={homeLeft} alt="" />
      <div className='center'>
        <img className='logo' src={logo} alt="" />
        <p className='welcome-message'>Todo管理你的计划，让你保持专注。</p>
        <button className='to-login-btn' onClick={toLogin}>登录</button>
        <button className='to-register-btn' onClick={toRegister}>注册</button>
      </div>
      <img src={homeRight} alt="" />
      <LoginOrRegister isShow={isShow}></LoginOrRegister>
    </div>
  )
}

export default hocAuthWelcomePage(WelcomePage);
