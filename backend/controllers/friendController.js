import FriendList from "../db/models/FriendsListModel.js";
import User from "../db/models/userModel.js";

const initializer = async(userId)=>{
    let newfriendlist = new FriendList({id:userId});
    try {
      await newfriendlist.save();
      return true;
    } catch (error) {
      return false;
    }
  }

const getFriendList = async(req,res)=>{
    console.log("used getfriends route");
    let userId = "qq"
    const friendList = await FriendList.findOne({id:userId})
    .populate('friendsList','userName userEmail userImage')
    .select('-hash -salt')
    .exec();

    console.log(friendList);
    res.status(200).json({friendList});
}


export default {getFriendList,initializer}