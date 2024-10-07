import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom"
import fbook from "../../../images/f.png";
import hub from "../../../images/h.png";
import googleimg from "../../../images/g.png";

import "./Signup.css";

function Signup() {
  const [showPas, setShowPas] = useState(false);
  const [userDetail,setUserDetail] = useState({
    userName:'',
    userEmail:'',
    pwd:'',
    cpwd:''
  })

  const handleChangeInput = (e)=>{
    const { name, value } = e.target;
    setUserDetail((prevData) => ({
      ...prevData,    
      [name]: value,
    }));
  }

  const submitSignup = async ()=>{
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(userDetail),
    });
    
    setUserDetail({
      userName: '',
      userEmail: '',
      pwd: '',
      cpwd: ''
  });

  if(response.ok) <Navigate to="/welcome" replace />;
  
  }

  return (
    //Background of the signup page
    <div className="relative flex justify-center items-center w-full h-screen bg-[#0f0f0f]">
      {/* Circle Big  */}
      <div
        className="absolute w-[15vw] h-[15vw] max-w-[320px] 
    max-h-[320px]  rounded-full top-[1%] left-[58%] bgU"
      ></div>
      {/* Circle Small  */}
      <div
        className="absolute w-[10vw] h-[10vw] max-w-[220px]
     max-h-[220px] rounded-full top-[79.2%] left-[85.5%] bgU "
      ></div>

      {/* Forground of the Signup Page  */}
      <div className=" p-9 absolute w-full h-screen flex justify-center items-center">
      <div className="hidden lg:flex ml-16 w-full h-full flex-col justify-center items-start">
          <div className="font-semibold text-white text-8xl ">
            Roll the Carpet.!
          </div>
          <div className="flex w-full">
            <div className="text-center p-5 min-w-72 border-4 border-white text-white text-4xl ">
              Skip the lag ?
            </div>
            <div className="mt-10 border-t-4 border-dashed border-gray-500 w-full my-4"></div>
          </div>
        </div>

        <div className="relative w-[1000px] h-[90%] flex flex-col justify-center">
          <div className="pl-10 pr-20 w-[75%] min-w-[430px] h-full min-h-[800px] rounded-2xl top-[8%] flex flex-col justify-center glassy">
            <div className="pt-12 text-5xl  text-white leading-sm">Signup</div>
            <div className="text-xl text-white">
              Just some details to get you in.!
            </div>
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={userDetail.userName}
              onChange={handleChangeInput}
              className="text-white mt-5 rounded-xl border border-solid border-white input focus:border-white text-[20px] w-full max-w-full p-4"
            />
            <input
              type="text"
              placeholder="Email"
              name="userEmail"
              value={userDetail.userEmail}
              onChange={handleChangeInput}
              className="text-white mt-5 rounded-xl border border-solid border-white input focus:border-white text-[20px] w-full max-w-full  p-4"
            />
            <input
              type="text"
              placeholder="Password"
              name="pwd"
              value={userDetail.pwd}
              onChange={handleChangeInput}
              className="text-white mt-5 rounded-xl border border-solid border-white input focus:border-white text-[20px] w-full max-w-full  p-4"
            />
            <input
              type="text"
              placeholder="cpwd"
              name="cpwd"
              value={userDetail.cpwd}
              onChange={handleChangeInput}
              className="text-white mt-5 mb-8 rounded-xl border border-solid border-white input focus:border-white text-[20px] w-full max-w-full  p-4"
            />
            <button onClick={()=>submitSignup()} className="mt-12 btn h-16 text-2xl text-white Signinbtn">
              Signup
            </button>
            <div className="text-xl divider">OR</div>

            <div className="mt-1 mb-7 flex flex-row gap-8 justify-center items-center">
              <img className="w-12 h-12" src={googleimg} alt="google" />
              <img className="w-12 h-12" src={fbook} alt="facebook" />
              <img className="w-12 h-12" src={hub} alt="github" />
            </div>

            <Link to="/signin" className="text-white mt-6 text-base text-center">
              Already have an account? Signin
            </Link>
            <div className="text-white flex justify-between items-center text-sm">
              <div>Terms & Conditions</div>
              <div>Support</div>
              <div>Customer Care</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
