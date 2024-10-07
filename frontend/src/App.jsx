import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/signup/Signup.jsx";
import Signin from "./pages/signin/Signin.jsx";
import Forgot from "./pages/forgot/Forgot.jsx";
import Home from "./pages/Home/Home.jsx";
function App() {
  const isAuth = false;
  return (
    <Routes>
      <Route path="/signin" element={(!isAuth) ? <Signin /> : <Navigate to="/" />} />
      <Route path="/signup" element={(!isAuth) ? <Signup /> : <Navigate to="/" />} />
      <Route path="/forgot" element={(!isAuth) ? <Forgot /> : <Navigate to="/" />} />
      <Route path="/" element={isAuth ? <Home /> : <Signin />} />
    </Routes>
  );
}

export default App;
