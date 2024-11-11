import Message from "../db/models/messageModel.js";
import Conversation from "../db/models/conversation.js";
import conversationUtil from "./utils/conversationUtil.js";


const getMessages = async(req,res)=>{
    const {senderId,reciverId} = req.body;
    try {
        const conversationId = await conversationUtil.getConversationId(senderId,reciverId);
        if(!conversationId) throw new Error("Error while retriving conversationId");
        const message = await Message.find({conversationId})
        .select("content createdAt from to");
        if(!message) throw new Error("Error while retriving message");
        // console.log(message);
        res.status(200).json({message});
    } catch (error) {
        console.log("Error in getConversation",error);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
}



const sendMessage = async (sender,reciver, io, conversationId, reciverId, message) => {
    if (reciverId) {
        io.to(reciverId).emit('messenger', message);
    }
    let newMessage = new Message({
        from:sender,
        to:reciver,
        conversationId,
        content: message,
        delivered: true,
        isRead: false
    });

    await newMessage.save();
}


export default {
    sendMessage,
    getMessages,
}


