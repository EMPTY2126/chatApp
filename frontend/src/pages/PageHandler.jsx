import React, { useEffect } from 'react'
import {Routes, Route, Navigate } from "react-router-dom";
import Signup from "./signup/Signup.jsx";
import Signin from "./signin/Signin.jsx";
import Forgot from "./forgot/Forgot.jsx";
import Home from "./Home/Home.jsx";
import authenticator from "../utils/Authenticator.js";
import { useAuth } from '../context/AuthContext.jsx';

function PageHandler() {
const { isAuth, setIsAuth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const flag = authenticator();
      setIsAuth(flag);
    };

    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={!isAuth ? <Signin /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuth ? <Signup /> : <Navigate to="/" />} />
      <Route path="/forgot" element={!isAuth ? <Forgot /> : <Navigate to="/" />} />
      <Route path="/" element={isAuth ? <Home /> : <Signin />} />
    </Routes>
  );
}

export default PageHandler