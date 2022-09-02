import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import PubSub from 'pubsub-js';

import './Setting.less';

function Setting() {
    let [isOpenSetting, setIsOpenSetting] = useState(false);
    useEffect(() => {
        PubSub.subscribe('openSetting', (_, data) => {
            setIsOpenSetting(data);
        })
        document.addEventListener("click", () => {
            setIsOpenSetting(false);
        })
    })
    let dragCloseStatus = {
        isDown: false,//鼠标是否按下
        isStartDrag: false,//是否开始拖动
        startDownX: 0,//开始鼠标按下的坐标
        dragX: 0//拖动的坐标
    };
    const startDragClose = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        dragCloseStatus.isDown = true;
        dragCloseStatus.startDownX = e.clientX;
    }
    const dragClose = () => {
        let previousX = dragCloseStatus.startDownX;
        return (e) => {
            e.nativeEvent.stopImmediatePropagation();
            dragCloseStatus.isStartDrag = true;
            if (dragCloseStatus.isDown && dragCloseStatus.isStartDrag) {
                let nowX = e.clientX;
                let deltaX = nowX - previousX;
                previousX = nowX;
                dragCloseStatus.dragX += deltaX;
                let percentage = dragCloseStatus.dragX / e.target.offsetWidth;
                console.log(e.target.offsetWidth);
                e.target.style.transform = `translate3d(${percentage * 100}%,0,0)`;
            }
        }
    }
    const dragStop = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        dragCloseStatus.isDown = false;
        dragCloseStatus.isStartDrag = false;
    }

    const startSetting = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    }
    return (
        <div className='setting'
            style={isOpenSetting ? { transform: 'translate3d(0%,0,0)' } : {}}
            onClick={startSetting}
            onMouseDown={startDragClose}
            onMouseMove={dragClose()}
            onMouseUp={dragStop}
        >
            <div className="title">设置</div>
            <div className="background">
                <p>背景颜色</p>
                <Radio.Group>
                    <Radio value={1}>浅色</Radio>
                    <Radio value={2}>深色</Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default Setting;
