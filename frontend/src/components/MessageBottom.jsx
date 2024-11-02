import React, { useState } from "react";
import { IoAddOutline, IoSendSharp } from "react-icons/io5";

function MessageBottom({ chatProfile,socket }) {
  const [chatMessage, setChatMessage] = useState("");

  const sendMessage = async () => {
    let msg = {
      reciver : chatProfile.userId ,
      message : chatMessage
    }

    if(socket){
      await socket.emit('sendmessage',msg);
    }
    setChatMessage("");
  };


  return (
    <div className="h-24 w-full flex justify-center items-center bg-slate-700">
      <div className="text-3xl mr-4">
        <IoAddOutline />
      </div>
      <input
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        placeholder="Type a message"
        className="p-5 outline-none w-3/4 h-12 rounded-lg  text-slate-300"
      ></input>
      <div onClick={sendMessage} className="text-3xl ml-4">
        <IoSendSharp />
      </div>
    </div>
  );
}

export default MessageBottom;
