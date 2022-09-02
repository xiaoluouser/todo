import React from 'react';
import { Link } from 'react-router-dom';
import { Input,message  } from 'antd';
import { SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js';

import logo from '@/assets/logo.png';
import './Header.less';

const { Search } = Input;
function Header() {
    const setting=(e)=>{
        e.nativeEvent.stopImmediatePropagation();
        PubSub.publish("openSetting",true);
    }
    const feedback=()=>{
        message.info("暂无反馈");
    }
    return (
        <div className="top-bar">
            <div className="logo">
                <Link to={'/todo/home'} title="首页">
                    <img src={logo} alt="logo"></img>
                </Link>
            </div>
            <div className="content-title"><span>制定计划</span></div>
            <div className="right-options">
                <div className="search">
                    <Search placeholder="请输入搜索的内容..." enterButton style={{ width: '100%' }} />
                </div>
                <div className="set" title='设置' onClick={setting}><SettingOutlined /></div>
                <div className="more" title='更多'>
                    <EllipsisOutlined />
                    <div className='more-list' onClick={feedback}>反馈</div>
                </div>
            </div>
        </div>
    )
}

export default Header;
