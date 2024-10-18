import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import fbook from "../../../images/f.png";
import hub from "../../../images/h.png";
import googleimg from "../../../images/g.png";
import { useAuth } from "../../context/AuthContext";

import "./Signin.css";

function Signin() {
  const { setIsAuth,setUser } = useAuth();
  const navigate = useNavigate();
  const [showPas, setShowPas] = useState(false);
  const [userCreds, setUserCreds] = useState({
    userEmail: "",
    pwd: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserCreds((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelLogin = async () => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    });

    let data = await response.json();
    console.log(data);
    setUserCreds({
      userEmail: "",
      pwd: "",
    });

    if (data.isSuccess) {
      setIsAuth(true);
      setUser(data.user.userId);
    }
  };

  return (
    //Background of the signup page
    <div className="relative flex justify-center items-center w-full h-screen bg-[#0f0f0f]">
      {/* Circle Big  */}
      <div
        className="absolute min-w-[10vw] min-h-[10vh]  w-[15vw] h-[15vw] max-w-[320px] 
    max-h-[320px]  rounded-full top-[1%] left-[58%] bgC"
      ></div>
      {/* Circle Small  */}
      <div
        className="absolute w-[10vw] h-[10vw] max-w-[220px]
     max-h-[220px] bg-gradient-to-br
     from-purple-600 to-indigo-900 rounded-full top-[79.2%] left-[85.5%] "
      ></div>

      {/* Forground of the Signup Page  */}
      <div className=" p-9 absolute w-full h-screen flex justify-center items-center">
        <div className="hidden ml-16 w-full h-full lg:flex flex-col justify-center items-start">
          <div className="font-semibold text-white text-8xl ">
            Welcome Back .!
          </div>
          <div className="flex w-full">
            <div className="text-center p-5 min-w-72 border-4 border-white text-white text-4xl ">
              Skip the lag ?
            </div>
            <div className="mt-10 border-t-4 border-dashed border-gray-500 w-full my-4"></div>
          </div>
        </div>

        <div className="relative w-[1000px] h-[90%] flex flex-col justify-center">
          <div className="pl-10 pr-20 w-[75%] max-w-[470px] min-w-[430px] min-h-[590px] h-full rounded-2xl flex flex-col justify-center items-center overflow-auto glassy">
            
            
            <div className="w-full">
            <div className="text-5xl mt-24  text-white leading-sm">Login</div>
            <div className="text-xl text-white">Glad you are back.!</div>
            <input
              type="text"
              placeholder="UserEmail"
              name="userEmail"
              value={userCreds.userEmail}
              onChange={handleChangeInput}
              className="mt-5 mb-8 p-4 text-xl  text-white rounded-xl border border-solid border-white input focus:border-white w-full max-w-full"
            />
            <label className="mb-4 p-4 text-xl text-white border border-solid border-white rounded-xl input focus:border-white flex items-center gap-2">
              <input
                type={!showPas ? "password" : "text"}
                className="grow"
                placeholder="Password"
                name="pwd"
                value={userCreds.pwd}
                onChange={handleChangeInput}
              />
              {!showPas ? (
                <FaEyeSlash onClick={() => setShowPas(!showPas)} />
              ) : (
                <IoEyeSharp onClick={() => setShowPas(!showPas)} />
              )}
            </label>
            <div className="flex">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox [--chkbg:#d27eef] [--chkfg:black] checked:border-rgb(78,1,93)"
              />
              <div className="ml-2 text-xl">Remember me</div>
            </div>
            <div className="flex flex-col">
              <button onClick={()=>handelLogin()} className="mt-12 btn h-16 text-2xl text-white bgI">
                Login
              </button>
              <Link to="/forgot" className="text-center text-xl text-white">
                Forgot password?
              </Link>
            </div>
            </div>

            <div className="w-full">
              <div className="text-xl divider">OR</div>
              <div className="mt-1 flex flex-row gap-8 justify-center items-center">
                <img className="w-12 h-12" src={googleimg} alt="google" />
                <img className="w-12 h-12" src={fbook} alt="facebook" />
                <img className="w-12 h-12" src={hub} alt="github" />
              </div>
            </div>

            
            {/* Change MAde HERE  */}
            <div className="w-full mb-5 h-full flex flex-col justify-end items-center ">
              <Link
                to="/signup"
                className="text-white text-base text-center"
              >
                Dont't have an account? Signup
              </Link>
              <div className=" text-white flex justify-between items-center text-sm gap-5">
                <div>Terms & Conditions</div>
                <div>Support</div>
                <div>Customer Care</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signin;
