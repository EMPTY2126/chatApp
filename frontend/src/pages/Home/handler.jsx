import TextCard from "../../components/TextCard";
import MessageBubbleRecive from "../../components/MessageBubbleRecive";
import MessageBubbleSend from "../../components/MessageBubbleSend";

// const chatClickHandler = async (mainUser, userId, userName, setChatProfile, setMessage) => {
//   const newChatProfile = { userId, userName, userImage: "" };
//   const ids = {senderId:mainUser, reciverId:userId}
//   setChatProfile(newChatProfile);
//   console.log(ids);
//   const response = await fetch("http://localhost:5000/api/getmessage", {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(ids)
//   });

//   if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// try {
//   let data = await response.json();
//   const message = data.message.map((ele, index) => {
//     if (ele.start === true)
//       return (
//         <MessageBubbleRecive key={index} time={ele.time} message={ele.message}/>
//       );
//     else
//       return (
//         <MessageBubbleSend key={index} time={ele.time} message={ele.message} />
//       );
//   });
//   setMessage(message);

// } catch (error) {
//   setMessage([]);
// }

// };

const chatClickHandler = async (
  mainUser,
  userId,
  userName,
  setChatProfile,
  setMessage
) => {
  const newChatProfile = { userId, userName, userImage: "" };
  const ids = { senderId: mainUser, reciverId: userId };

  console.log(ids);

  try {
    const response = await fetch("http://localhost:5000/api/getmessage", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log(data.message);

    const message = data.message.map((ele, index) => {
      const date = new Date(ele.createdAt);
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (ele.from === mainUser)
        return (
          <MessageBubbleRecive
            key={index}
            time={formattedTime}
            message={ele.content}
          />
        );
      else
        return (
          <MessageBubbleSend
            key={index}
            time={formattedTime}
            message={ele.content}
          />
        );
    });
    console.log(message);
    setMessage(message);
    setChatProfile(newChatProfile);
  } catch (error) {
    console.error("Error fetching messages:", error);
    setMessage([]);
  }
};

const friendList = async (user, setChatProfile, setFriends, setMessage) => {
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
      <TextCard
        textCardHandler={() =>
          chatClickHandler(
            user,
            ele.userId,
            ele.userName,
            setChatProfile,
            setMessage
          )
        }
        key={index}
        userId={ele.userId}
        userName={ele.userName}
        date="monday"
      />
    ));
    setFriends(mapData);
  } catch (error) {
    console.error("Error fetching friends list:", error);
    setFriends([]);
  }
};

export default {
  friendList,
};
