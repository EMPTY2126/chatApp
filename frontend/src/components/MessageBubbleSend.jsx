import React from "react";

function MessageBubbleSend({message,time}) {
  return (
    <div className="chat chat-start max-w-md">
  <div className="chat-bubble">
    {message}
    <span className="text-xs block text-left mt-[-2px] mb-[-4px] select-none">{time}</span>
  </div>
</div>
  );
}

export default MessageBubbleSend;
