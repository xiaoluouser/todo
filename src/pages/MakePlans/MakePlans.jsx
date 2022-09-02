import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { DatePicker, Empty, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import PlanItem from '@/components/PlanItem/PlanItem.jsx';
import Skinning from '@/components/Skinning/Skinning.jsx';
import { hexToRgba } from '@/utils/colorBase.js';
import { deleteAsyncPlans, mainAsyncPlans, createAsyncPlans, checkedAsyncPlans } from '@/store/actions/plans.js';
import { changeBgcolor, getBgcolor, saveBgcolor, postPlan, checkPlans, deletePlans, mainPlans } from '@/api/index.js';

import './MakePlans.less';

const { RangePicker } = DatePicker;
function MakePlans(props) {
    const {
        plans,
        dispatchAsyncIsChecked,
        dispatchAsyncMain,
        dispatchAsyncIsDelete,
        dispatchAsyncPlans
    } = props;
    useEffect(() => {
        dispatchAsyncPlans();
    }, [dispatchAsyncPlans])
    console.log(plans);
    //滚动到一定程度浮动显示切换皮肤的图标
    let [isFloatList, setIsFloatList] = useState(false);
    const scrollPage = (e) => {
        if (e.target.scrollTop >= 52) {
            setIsFloatList(true);
        } else {
            setIsFloatList(false);
        }
    }
    //获取改变之后的颜色
    let [color, setColor] = useState('');
    const getChangeColor = async (color) => {
        await saveBgcolor({ color, area: 'plan' });
        let meg = await changeBgcolor({ color, area: 'plan' });
        if (meg.data.status === 0) {
            message.info(meg.data.message);
            setColor(() => color);
        }
    }
    useEffect(() => {
        (async function () {
            let meg = (await getBgcolor('plan')).data.data[0];
            setColor(meg.color);
        })();
    }, [color])

    const changeChecked = async (id, isCheck) => {
        let meg = (await checkPlans({ id, isCheck })).data;
        if (meg.status === 0) {
            dispatchAsyncIsChecked();
        }
    }
    const changeMain = async (id, isMain) => {
        let meg = (await mainPlans({ id, isMain })).data;
        console.log(meg);
        if (meg.status === 0) {
            dispatchAsyncMain();
        }
    }
    const changeDelete = async (id) => {
        let meg = (await deletePlans({ id })).data;
        if (meg.status === 0) {
            message.error(meg.message);
            dispatchAsyncIsDelete();
        }
    }

    let planContent = <Empty description='暂无计划'></Empty>;
    if (plans.undone) {
        planContent =
            (<div className="plan-content">
                {plans.undone.map(item => {
                    return (<PlanItem
                        key={item.id}
                        info={{ ...item }}
                        changeChecked={changeChecked}
                        changeMain={changeMain}
                        changeDelete={changeDelete}
                    ></PlanItem>)
                })}
                <p className='title'>已完成{plans.done.length}
                    <DownOutlined style={{ transition: `all 0.3s ease-in -out` }} /></p>
                <div className='completed-plan'>
                    {plans.done.map(item => {
                        return (<PlanItem
                            key={item.id}
                            info={{ ...item }}
                            changeChecked={changeChecked}
                            changeMain={changeMain}
                            changeDelete={changeDelete}
                        ></PlanItem>)
                    })}
                </div>
            </div>)
    }
    let [date, setDate] = useState([]);
    let inputNode = useRef(null);
    const selectDate = (_, date) => {
        setDate(date);
    }
    const createPlan = async () => {
        if (!inputNode.current.value.trim()) {
            message.warn("计划不能为空！");
            return;
        }
        if (!date.length) {
            message.warn("请确定开始或结束的时间！");
            return;
        }
        let meg = (await postPlan({
            plan: inputNode.current.value,
            endTime: date[1],
            startTime: date[0],
            isCheck: false,
            isMain: 0,//0代表不重要
            isDelete: 0,//0代表未删除
        })).data;
        if (meg.status === 0) {
            dispatchAsyncPlans();
            message.info(meg.message);
        }
        inputNode.current.value = '';
    }
    return (
        <div className="make-plans"
            onScroll={scrollPage}
            style={{ background: `${color}` }}>
            <div className="content-top-bar">
                <p className="title">制定计划</p>
                <Skinning
                    color={color}
                    isFloatList={isFloatList}
                    getChangeColor={getChangeColor}>
                </Skinning>
            </div>
            {/* <!-- 计划内容的每一项 --> */}
            {planContent}
            {/* <!-- 创建的计划框框 --> */}
            <div className="create-plan-box" style={{ background: `${hexToRgba(color)}` }}>
                <div className='box'>
                    <PlusOutlined className='add-plan' title='创建计划' onClick={createPlan} />
                    <input type="text" ref={inputNode} placeholder="开始制定你的计划"></input>
                    <RangePicker onChange={selectDate} showTime bordered={false} format='YYYY-MM-DD HH:mm' style={{ height: '50px', width: '48%' }} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        plans: state.plans
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAsyncPlans() {
            dispatch(createAsyncPlans());
        },
        dispatchAsyncIsChecked() {
            dispatch(checkedAsyncPlans());
        },
        dispatchAsyncIsDelete() {
            dispatch(deleteAsyncPlans());
        },
        dispatchAsyncMain() {
            dispatch(mainAsyncPlans());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakePlans);
