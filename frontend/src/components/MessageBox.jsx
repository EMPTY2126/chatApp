import React from "react";
import MessageBubbleSend from "./MessageBubbleSend";
import MessageBubbleRecive from "./MessageBubbleRecive";


const chatMessages = [
    { time: "10:00 AM", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo maiores illum aperiam nesciunt ratione consectetur!", from: "Alice", start: true },
    { time: "10:02 AM", message: "I'm good, how about you?", to: "Alice", start: false },
    { time: "10:03 AM", message: "Doing well, thanks!", from: "Alice", start: false },
    { time: "10:05 AM", message: "Are you free for a call later?", to: "Alice", start: true },
    { time: "10:06 AM", message: "Sure, what time works for you?", from: "Alice", start: false },
    { time: "10:10 AM", message: "How about 3 PM?", to: "Alice", start: false },
    { time: "10:12 AM", message: "Perfect, I'll be ready.", from: "Alice", start: true },
    { time: "10:15 AM", message: "Cool, see you then.", to: "Alice", start: false },
    { time: "10:20 AM", message: "By the way, did you finish the report?", from: "Alice", start: true },
    { time: "10:00 AM", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo maiores illum aperiam nesciunt ratione consectetur!", from: "Alice", start: true },
    { time: "10:02 AM", message: "I'm good, how about you?", to: "Alice", start: false },
    { time: "10:03 AM", message: "Doing well, thanks!", from: "Alice", start: false },
    { time: "10:05 AM", message: "Are you free for a call later?", to: "Alice", start: true },
    { time: "10:06 AM", message: "Sure, what time works for you?", from: "Alice", start: false },
    { time: "10:10 AM", message: "How about 3 PM?", to: "Alice", start: false },
    { time: "10:12 AM", message: "Perfect, I'll be ready.", from: "Alice", start: true },
    { time: "10:15 AM", message: "Cool, see you then.", to: "Alice", start: false },
    { time: "10:20 AM", message: "By the way, did you finish the report?", from: "Alice", start: true },
    { time: "10:22 AM", message: "Yes, I sent it to your email.", to: "Alice", start: false }
  ];

const msg = chatMessages.map((ele,index)=>{
    if(ele.start === true) return <MessageBubbleRecive key={index} time={ele.time} message={ele.message} />
    else return<MessageBubbleSend key={index} time={ele.time} message={ele.message} />
})
  
function MessageBox() {
  return (
    <div className="w-full h-full overflow-y-auto ">
      {msg}
    </div>
  );
}

export default MessageBox;
