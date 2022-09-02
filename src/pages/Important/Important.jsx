import React from 'react';
import {Outlet,NavLink} from 'react-router-dom';
import { SkinOutlined } from '@ant-design/icons';

import './Important.less';

function Important() {
  return (
    <div className="important">
      <div className="content-top-bar">
        <p className="title">重要</p>
        <ul className='important-options'>
          <li><NavLink to={'importantplans'} className={({isActive})=>isActive?'select-important-options':''}>重要计划</NavLink></li>
          <li></li>
          <li><NavLink to={'importantdiary'} className={({isActive})=>isActive?'select-important-options':''}>重要日记</NavLink></li>
        </ul>
        <div className="skinning" title='换肤'><SkinOutlined /></div>
      </div>
      <div className='important-content'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Important;
