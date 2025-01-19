import React,{useEffect, useRef} from "react";
  
function MessageBox({msg}) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  return (
    msg ?
    (
      <div className="w-full h-full overflow-y-auto ">
      {msg}
      <div ref={messageEndRef} />
      </div>
    ):
    (
      <div className="m-auto text-4xl">
        Start chatting Now
      </div>
    )
    
  );
}

export default MessageBox;
