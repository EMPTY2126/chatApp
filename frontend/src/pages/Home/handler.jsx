import TextCard from "../../components/TextCard";


const chatClickHandler = (userId, userName,setChatProfile) => {
  // console.log(userId, userName);
  const newChatProfile = { userId, userName, userImage: "" };
  setChatProfile(newChatProfile);
};



const friendList = async (setChatProfile,setFriends) => {
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
          textCardHandler={()=>chatClickHandler(ele.userId,ele.userName,setChatProfile)}
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
    friendList
}