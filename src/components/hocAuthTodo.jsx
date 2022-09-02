import React  from 'react';
import { Navigate } from 'react-router-dom';

const hocAuthTodo = (TodoComponent) => {
   return () => {
      if (!JSON.parse(localStorage.getItem("token"))) {
         console.log("请先登录！");
         return <Navigate to={'/welcomepage'}></Navigate>
      }
      return <TodoComponent/>;
   }
}

export default hocAuthTodo;