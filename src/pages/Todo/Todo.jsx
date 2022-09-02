import React  from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Setting from '../../components/Setting/Setting.jsx';
import hocAuthTodo from '@/components/hocAuthTodo.jsx';
import './Todo.less';

function Todo() {
    return (
        <div className='todo'>
            <Header></Header>
            <div className="middle">
                <SideMenu></SideMenu>
                <div className="content-show-area">
                    <Outlet></Outlet>
                </div>
                <Setting></Setting>
            </div>
        </div>
    )
}

export default hocAuthTodo(Todo);
