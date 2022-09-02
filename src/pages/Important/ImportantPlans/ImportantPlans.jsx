import React, { useEffect } from 'react';
import { Empty } from 'antd';
import { connect } from 'react-redux/es/exports';
import PlanItem from '@/components/PlanItem/PlanItem.jsx';
import { mainPlans } from '@/api';
import { mainAsyncPlans } from '@/store/actions/plans';

function ImportantPlans(props) {
  const {plans,dispatchAsyncMain }=props;
  let {main=[]}=plans;
  const changeMain = async (id, isMain) => {
    let meg = (await mainPlans({ id, isMain })).data;
    if (meg.status === 0) {
      dispatchAsyncMain();
    }
  }
  useEffect(()=>{
    dispatchAsyncMain();
  },[dispatchAsyncMain])
  let importantContent = <Empty description='暂无重要计划'></Empty>;
  console.log(plans);
  if (main.length !== 0) {
    importantContent =
      <div style={{ width: '80%', margin: '0 auto', paddingBottom: '150px', }}>
        {
          main.map(item => {
            return (<PlanItem
              changeMain={changeMain}
              key={item.id}
              info={{ ...item }}
              isShouCheckbox={false}
            ></PlanItem>)
          })
        }
      </div>
  }
  return (
    <>
      {importantContent}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    plans: state.plans
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAsyncMain() {
      dispatch(mainAsyncPlans());
  }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImportantPlans);
