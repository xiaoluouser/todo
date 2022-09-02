import React  from 'react';
import { Checkbox, Rate } from 'antd';
import { FieldTimeOutlined, CloseCircleFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from "@fortawesome/fontawesome-free-solid";

import './PlanItem.less';

function PlanItem(props) {
    const { info,changeChecked,changeMain,changeDelete,isShouCheckbox=true }=props;
    const clickCheck = (id) => {
        return (e) => {
            changeChecked(id, e.target.checked);
        }
    }
    const clickMain = (id) => {
        return (value) => {
            changeMain(id, value);
        }
    }
    const chickDelete = (id) => {
        return () => {
            changeDelete(id);
        }
    }
    return (
        <div className='plan-item'>
            {isShouCheckbox?<Checkbox className='check' onChange={clickCheck(info.id)} checked={info.isCheck}></Checkbox>:<></>}
            <span className='plan'>{info.plan}</span>
            <Rate className='star' value={info.isMain} count={1} onChange={clickMain(info.id)}></Rate>
            <span className='endTime'><FontAwesomeIcon icon={faCalendar} title='截止时间' />{info.endTime}</span>
            <span className='startTime'><FieldTimeOutlined title='开始时间' />{info.startTime}</span>
            <span className='delete'><CloseCircleFilled onClick={chickDelete(info.id)} title="删除" /></span>
        </div>
    )
}

export default PlanItem;
