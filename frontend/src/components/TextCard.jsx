import React from "react";

function TextCard({ userName, date, lastMessage }) {
  return (
    <div className="h-20 w-full flex justify-start items-center">
      <div className="ml-2 mr-2 avatar">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="border-t-2 border-gray-500 text-lg w-full h-full flex flex-col justify-between text-white">
        <div className=" mt-3 ml-3 mr-3 flex flex-row justify-between">
            <div>{userName}</div>
            <div>{date}</div>
            </div>
            <div className="ml-3 max-w-[380px] overflow-x-hidden text-nowrap">{lastMessage}</div>
      </div>
    </div>
  );
}

export default TextCard;
