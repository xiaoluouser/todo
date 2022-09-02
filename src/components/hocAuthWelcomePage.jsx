import React from 'react'
import { Navigate } from 'react-router-dom';

const hocAuthWelcomePage = (WelcomeComponent) => {
  return ()=>{
    if (JSON.parse(localStorage.getItem("token"))) {
        return <Navigate to={'/todo/home'}></Navigate>
     }
     return <WelcomeComponent/>;
  }
}

export default hocAuthWelcomePage;