import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";

function MessageBottom() {
  return (
    <div className="h-24 w-full flex justify-center items-center bg-slate-700">
      <div className="text-3xl mr-4">
        <IoAddOutline />
      </div>
      <input
        placeholder="Type a message"
        className="p-5 outline-none w-3/4 h-12 rounded-lg  text-slate-300"
      ></input>
      <div className="text-3xl ml-4">
        <IoSendSharp />
      </div>
    </div>
  );
}

export default MessageBottom;
