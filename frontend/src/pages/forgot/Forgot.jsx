import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Forgot.css";

function Forgot() {
  const [showPas, setShowPas] = useState(false);
  return (
    //Background of the signup page
    <div className="relative flex justify-center items-center w-full h-screen bg-[#0f0f0f]">
      {/* Circle Big  */}
      <div
        className="absolute w-[15vw] h-[15vw] max-w-[320px] 
    max-h-[320px]  rounded-full top-[1%] left-[58%] bgF"
      ></div>
      {/* Circle Small  */}
      <div
        className="absolute w-[10vw] h-[10vw] max-w-[220px]
     max-h-[220px]  rounded-full top-[79.2%] left-[85.5%] bgF "
      ></div>

      {/* Forground of the Signup Page  */}
      <div className=" p-9 absolute w-full h-screen flex justify-center items-center">
        <div className="hidden ml-16 w-full h-full lg:flex flex-col justify-center items-start">
          <div className="font-semibold text-white text-8xl ">
            No Worries.!!
          </div>
          <div className="flex w-full">
            <div className="text-center p-5 min-w-80 border-4 border-white text-white text-4xl ">
              Take me back.!
            </div>
            <div className="mt-10 border-t-4 border-dashed border-gray-500 w-full my-4"></div>
          </div>
        </div>

        <div className="relative w-[1000px] h-[90%] flex flex-col justify-center">
          <div className="pl-10 pr-20 w-[75%] min-w-[430px] h-full min-h-[590px] rounded-2xl top-[8%] flex flex-col justify-center overflow-auto glassy">
            <div className="mt-16 text-4xl  text-white leading-sm">
              Forgot Password ?
            </div>
            <div className="text-xl text-white">Please enter you’re email</div>
            <input
              type="text"
              placeholder="example@mail.com"
              className="mt-5 mb-8 p-4 text-xl rounded-xl border border-solid border-white input focus:border-white text-[28px] w-full max-w-full"
            />

            <button className="btn h-16 text-2xl text-white resetButton">
              Reset Password
            </button>

            <div className="mt-96 pt-5 text-center">
              <Link to="/signup" className=" text-white text-base text-center">
                Dont't have an account? Signup
              </Link>
              <div className="text-white flex justify-between items-center text-sm gap-5">
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

export default Forgot;
