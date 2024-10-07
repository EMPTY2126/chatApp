import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";


function chatTopProfile({userName,profileImg}) {
  return (
    <div className="relative h-20 w-full bg-slate-700 flex justify-start items-center">
      <div className="ml-3 avatar">
        <div className=" w-14 h-14 rounded-full ">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div className="ml-3 mr-3 w-full text-xl flex justify-between">
        <div className=" text-white"> {userName} </div>
        <div className="mr-6 flex justify-start items-center text-2xl text-slate-400 gap-6">
          <div>
            <FiSearch />
          </div>
          <div>
            <HiDotsVertical />
          </div>
        </div>
      </div>
      </div>
  );
}

export default chatTopProfile;
