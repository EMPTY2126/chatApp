import React from "react";
  
function MessageBox({msg}) {
  return (
    msg ?
    (
      <div className="w-full h-full overflow-y-auto ">
      {msg}
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
