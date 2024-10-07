import React from "react";

function MessageBubbleRecive({message,time}) {
  return (
      <div className="chat chat-end">
        <div className="chat-bubble h-auto max-w-[65%] break-words">{message}
        <span className="text-xs block text-right mt-[-2px] mb-[-4px] select-none">{time}</span>
        </div>
        
      </div>
  );
}

export default MessageBubbleRecive;
