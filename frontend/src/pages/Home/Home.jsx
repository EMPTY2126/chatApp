import React, { useEffect, useState } from "react";
import TextCard from "../../components/TextCard";
import ChatTopProfile from "../../components/ChatTopProfile";
import MessageBottom from "../../components/MessageBottom";
import MessageBox from "../../components/MessageBox";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import { io } from "socket.io-client";
import axios from "axios";

function Home() {
  const { setIsAuth, setUser, user } = useAuth();
  const [friends, setFriends] = useState([]);

  const friendList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getfriends", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      data = data.friendList.friendsList;
      const mapData = data.map((ele, index) => (
        <TextCard key={index} userName={ele.userName} date="monday" />
      ));
      setFriends(mapData);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  };

  useEffect(() => {
    friendList();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <div className=" relative w-screen h-screen flex flex-col justify-start items-center">
      <div className="mt-5 w-full h-[96vh] flex">
        {/* chatList and Search Side  */}
        <div className="ml-16 w-1/4 min-w-[340px] max-w-[500px] h-full flex flex-col">
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
            <label className="mt-12 ml-3 mr-4 mb-2 input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
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
              </svg>
            </label>
          </div>
          {/* chat list */}
          <div className="w-full h-full overflow-y-auto ">{friends}</div>
        </div>
        {/* chat & message  */}
        <div className="mr-16 flex-grow bg-[#1f2937] flex flex-col">
          {/* ChatTopProfile  */}
          <ChatTopProfile userName="AnuLoose" profileImg="idk" />

          {/* Message Box  */}
          <MessageBox />

          {/* Send message section   */}
          <MessageBottom />
        </div>
      </div>
    </div>
  );
}

export default Home;
