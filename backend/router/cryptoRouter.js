import {Router} from "express"
import friendController from "../controllers/friendController.js";
import conversationUtil from "../controllers/utils/conversationUtil.js";
import Message from "../db/models/messageModel.js";
import User from "../db/models/userModel.js";
import FriendList from "../db/models/FriendsListModel.js";


export const router = Router();

router.get('/newuser/:userId', async(req,res)=>{
    console.log("used router")
    const userid = req.params.userId;
    const newUser = new User({
        userName:userid,
        userImage: "nm",
        hash:"qwd", salt:"qwd",
        userEmail:userid,
        userId: userid
    });

    try {
        let friendInitializer = await friendController.initializer(newUser.userId); // initilizing friendlist collection
        if (!friendInitializer) throw new Error("friend initilizer error");
        await newUser.save(); // save the user in model and return user
        return res.status(201).json({ isSuccess: true, user: newUser, msg: "user created succesfully" });
    } catch (error) { //other error
        return res.status(500).json({ isSuccess: false, user: null, msg: "Internal server error" });
        }
});

router.get('/newconversation/:userId',async(req,res)=>{
    const senderId = req.params.userId;
    const reciverId = "support";
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
});

router.get('/getchat/:userId', async(req,res)=>{
    const senderId = req.params.userId;
    const reciverId = "support";
    try {
        const conversationId = await conversationUtil.getConversationId(senderId,reciverId);
        if(!conversationId) throw new Error("Error while retriving conversationId");
        const message = await Message.find({conversationId})
        .select("content createdAt from to");
        if(!message) throw new Error("Error while retriving message");
        res.status(200).json({message});
    } catch (error) {
        console.log("Error in getConversation",error);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
});

router.get("/getchat/:userId" ,async(req,res)=>{
  const senderId = req.params.userId;
    const reciverId = "support";
    try {
        const conversationId = await conversationUtil.getConversationId(senderId,reciverId);
        console.log(conversationId);
        if(!conversationId) throw new Error("Error while retriving conversationId");
        const message = await Message.find({conversationId})
        .select("content createdAt from to");
        if(!message) throw new Error("Error while retriving message");
        res.status(200).json({message});
    } catch (error) {
        console.log("Error in getConversation",error);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
})


