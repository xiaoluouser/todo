import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
//引入svg
import Sun from '../Svg/Sun.jsx';
import Star from '../Svg/Star.jsx';
import Statistics from '../Svg/Statistics.jsx';
import Front from '../Svg/Front.jsx';
import Plan from '../Svg/Plan.jsx';
import { getUserInfo } from '@/api/index.js';
import './SideMenu.less';

function SideMenu() {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        (async function () {
            let meg = (await getUserInfo()).data.data;
            console.log('@',meg);
            setUserInfo(meg);
        })()
    }, [])
    return (
        <div className="side-menu">
            <div className="user-info-show">
                <div className="avatar"><img src={userInfo.avatar} alt="" /></div>
                <div className="info">
                    <p className="name">{userInfo.name}</p>
                    <p className="phone">{userInfo.phone}</p>
                </div>
            </div>
            <ul className="menu-options">
                <li><NavLink to={'home'} className={({ isActive }) => isActive ? 'select-side-menu' : ''}><Front></Front><span>首页</span></NavLink></li>
                <li><NavLink to={'makeplans'} className={({ isActive }) => isActive ? 'select-side-menu' : ''}><Plan></Plan><span>制定计划</span></NavLink></li>
                <li><NavLink to={'myday'} className={({ isActive }) => isActive ? 'select-side-menu' : ''}><Sun></Sun><span>我的一天</span></NavLink></li>
                <li><NavLink to={'important'} className={({ isActive }) => isActive ? 'select-side-menu' : ''}><Star></Star><span>重要</span></NavLink></li>
                <li><NavLink to={'datachart'} className={({ isActive }) => isActive ? 'select-side-menu' : ''}><Statistics></Statistics><span>数据统计</span></NavLink></li>
            </ul>
            <div className="create-new-list">
                <Link to={'/home'}>
                    <PlusOutlined /><span>新建列表</span>
                </Link>
            </div>
        </div>
    )
}

export default SideMenu;