import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js';

import './DiaryDetail.less';

function DiaryDetail() {
    let [isInto, setIsInto] = useState(false);
    let [title, setTitle] = useState('');
    useEffect(() => {
        PubSub.subscribe('intoDiary', (_, data) => {
            setIsInto(data.isInto);
            setTitle(data.title);
        })
    }, [])
    const closePage = () => {
        setIsInto(false);
    }
    return (
        <>
            <div className='diary-mask' style={isInto ? { display: 'block' } : {}}></div>
            <div className='diary-detail' style={isInto ? { transform: 'translateX(0%)', width: '80%', boxShadow: '0 0 100px rgb(87, 87, 87)' } : {}}>
                <div className='header'>
                    <div className='info'>
                        <div className='avatar'></div>
                        <div className='name'>小明</div>
                        <div className='time'>7/21</div>
                    </div>
                    <div className='close' title='关闭' onClick={closePage}><CloseOutlined /></div>
                </div>
                <div className='title'>{title}</div>
                <div className='content'>内容</div>
            </div>
        </>
    )
}

export default DiaryDetail;
