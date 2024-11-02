import FriendList from "../db/models/FriendsListModel.js";
import {v4 as uuid4} from 'uuid'
import User from "../db/models/userModel.js";
import Conversation from '../db/models/conversation.js'

const initializer = async (userId) => {
  let newfriendlist = new FriendList({ id: userId });
  try {
    await newfriendlist.save();
    return true;
  } catch (error) {
    return false;
  }
}


const newConversation = async (senderId,reciverId)=>{
  const conversationId = uuid4();
  let newCon = new Conversation({
    conversationId,
    participants:[senderId,reciverId],
  });

  const updateFriends = await FriendList.findOneAndUpdate({id:senderId},
    {$addToSet:{friendsList:reciverId}},
    {new: true}
  ).select('friendsList');

  const newfriend = await FriendList.findOne({ id: senderId })
  .select('friendsList')
  .lean();

  console.log(newfriend.friendsList, "this is from newconversation");
  
  try {
    await newCon.save();
    return conversationId;
  } catch (error) {
    console.log("Error in new conversation");
    console.log(error);
    return null;
  }
}

const getFriendList = async (req, res) => {
  console.log("used getfriends route");
  // console.log(req.user._id);
  const friendList = await FriendList.findOne({ id: req.user._id })
    .populate('friendsList', 'userName userEmail userImage userId')
    .select('-hash -salt')
    .exec();

  res.status(200).json({ friendList });
}


export default { getFriendList, initializer, newConversation }