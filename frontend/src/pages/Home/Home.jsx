import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ChatTopProfile from "../../components/ChatTopProfile";
import MessageBottom from "../../components/MessageBottom";
import MessageBox from "../../components/MessageBox";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import { createSocket } from "../../socket/socket";
import handler from "./handler";
import { IoClose,IoSend } from "react-icons/io5";
import MessageBubbleRecive from "../../components/MessageBubbleRecive";
import MessageBubbleSend from "../../components/MessageBubbleSend";



function Home({userr}) {
  const { setIsAuth, setUser, user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [socket, setSocket] = useState(null);
  const [chatProfile, setChatProfile] = useState({
    userId: "",
    userName: "",
    userImage: "",
  });
  const [isAdd,setIsAdd] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [message,setMessage] = useState([]);

  useEffect(() => {
    console.log(userr," from home");
    handler.friendList(user, setChatProfile, setFriends, setMessage); //Friend list loader
    
    if (user) {
      const newSocket = createSocket(user);
      setSocket(newSocket);
      newSocket.on("connection", () => console.log("socket online"));
      newSocket.on("disconnect", () => console.log("socket offline"));

      newSocket.on("messenger", (data) => {
        console.log("message recived");
        console.log(data);
        if(data.sender === user){
          let newMessage = <MessageBubbleRecive key={`${Date.now()}-${Math.random()}`} time={"9:00"} message={data.message}/>
          setMessage((message)=>[...message,newMessage]);
        } else {
          let newMessage = <MessageBubbleSend key={`${Date.now()}-${Math.random()}`} time={"9:00"} message={data.message}/>
          setMessage((message)=>[...message,newMessage]);
        }
      });

      return () => newSocket.disconnect();
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  const searchFriend = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key was pressed");
      setSearchValue("");
      console.log(searchValue);
    }
  };


  return (
    <div className=" relative w-screen h-screen flex flex-col justify-start items-center">
      <div className="mt-5 w-full h-[96vh] flex">
        {/* chatList and Search Side  */}
        <div className="relative ml-16 w-1/4 min-w-[340px] max-w-[500px] h-full flex flex-col">
          <div className="relative text-white w-full">
            <div className="w-full absolute text-2xl">
              <div className=" flex flex-row justify-between items-center">
                <div className="ml-3 mt-2">Chats</div>
                <button onClick={handleLogout} className="mt-3 mr-5">
                  <TbLogout2 />
                </button>
              </div>
            </div>
            {/* Input with search box */}
            <label onKeyDown={searchFriend} className="mt-12 ml-3 mr-4 mb-2 input input-bordered flex items-center gap-2">
              <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="grow" placeholder={isAdd ? "Find friends here" : "Search"} />
              {
                isAdd ?
                <IoSend color="grey"/>
                :
                (<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>)
              }
            </label>
          </div>

          {/* chat list */}
          {
          !isAdd ?
          <div className="w-full h-full overflow-y-auto ">{friends}</div>
          :
          <div>
            
          </div>
          }
          {/* new friend  */}
          <div onClick={()=> setIsAdd(!isAdd)} className="mt-auto ml-auto mr-2 min-w-[90px] min-h-[90px] rounded-full bg-[#21ccad] text-center text-black text-3xl flex justify-center items-center transition-transform duration-300 hover:scale-105">
            {!isAdd ? <FaPlus/> : <IoClose/> }
          </div>
        </div>
        {/* chat & message container */}
        <div className="mr-16 flex-grow bg-[#1f2937] flex flex-col">
          {/* ChatTopProfile  */}
          {
            chatProfile.userId === "" ?
            ( 
            <>
              {/* <ChatTopProfile userName="" profileImg="" /> */}
              <MessageBox />
            </>
            ) :

            (
              <>
              <ChatTopProfile userName={chatProfile.userName} profileImg="idk" />

              {/* Message Box  */}
              <MessageBox msg={message} />

              {/* Send message section   */}
              <MessageBottom chatProfile={chatProfile} socket={socket} />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

