import FriendList from "../db/models/FriendsListModel.js";
import conversationUtil from "./utils/conversationUtil.js";
import User from "../db/models/userModel.js";

const initializer = async (userId) => {
  let newfriendlist = new FriendList({ id: userId });
  try {
    await newfriendlist.save();
    return true;
  } catch (error) {
    return false;
  }
}


const newConversation = async (req, res) => {
  const { senderId, reciverId } = req.body;
  const sender_Id = await User.findOne({ userId: senderId })
    .select('_id');

  const reciver_Id = await User.findOne({ userId: reciverId })
    .select('_id');
  try {
    const conversationId = await conversationUtil.createConversationId(senderId, reciverId);
    const updateFriendsSender = await FriendList.findOneAndUpdate({ id: senderId },
      { $addToSet: { friendsList: reciver_Id } },
      { new: true }
    ).select('friendsList');

    const updateFriendsReciver = await FriendList.findOneAndUpdate({ id: reciverId },
      { $addToSet: { friendsList: sender_Id } },
      { new: true }
    ).select('friendsList');
    return res.status(200).json({ msg: 'success' });
  } catch (error) {
    console.log("Error in new conversation", error);
    return res.status(200).json({ msg: 'failure' });
  }
}



const getFriendList = async (req, res) => {
  const userId = req.params.userId;
  console.log("used getfriends route");
  const friendList = await FriendList.findOne({ id: userId })
    .populate('friendsList', 'userName userEmail userImage userId')
    .select('-hash -salt')
    .exec();
  res.status(200).json({ friendList });
}


export default { getFriendList, initializer, newConversation }