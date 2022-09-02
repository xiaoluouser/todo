import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import moment from 'moment';
import { getPosition, getWeather } from '@/api/index.js';
import home from '@/assets/welcome-left.png';
import logo from '@/assets/logo.png';

import './Home.less';

function Home() {
    let [time, setTime] = useState(moment().format('YYYY年MM月DD日HH:mm:ss dddd'));
    let [adress, setAdress] = useState('');
    let [weather, setWeather] = useState('');
    useEffect(() => {
        let timer = setInterval(() => {
            setTime(moment().format('YYYY年MM月DD日HH:mm:ss dddd'))
        }, 1000)
        return () => { clearInterval(timer) }
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (data) => {
            let longitude = Number(data.coords.longitude.toFixed(2));
            let latitude = Number(data.coords.latitude.toFixed(2));
            let { adcode, city, district } = (await getPosition(longitude, latitude)).data.regeocode.addressComponent;
            let { weather, temperature } = (await getWeather(adcode)).data.lives[0];
            setAdress(`${city} ${district}`);
            setWeather(`${weather} ${temperature}℃`);
        }, (err) => {
            message.warn(err.message);
        })
    }, [])
    return (
        <div className="home">
            <div className="content-top-bar">
                <p className="title">首页</p>
                <p className="date">{time}</p>
                <p className='adress'>{adress}</p>
                <p className="weather">{weather}</p>
            </div>
            <div className='welcome-message'>
                <img className='logo' src={logo} alt="" />
                <p>欢迎<b></b>进入Todo，开始制定你的计划吧！</p>
                <img className='homeimage' src={home} alt="" />
            </div>
        </div>
    )
}

export default Home;