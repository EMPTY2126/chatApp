import { v4 as uuidv4 } from 'uuid';
import Conversation from '../../db/models/conversation.js';

const createConversationId = async(senderId,reciverId)=>{
    const conversationId = uuidv4();
    console.log(conversationId);
    const participants=[senderId,reciverId];
    let newConversation = new Conversation({
        conversationId,
        participants
    });
    console.log(senderId,reciverId);
    try {
        await newConversation.save();
        console.log("new thingy created");
        return newConversation.conversationId;
    } catch (error) {
        console.log("error in creating conversation ID", error);
        return null;
    }
};

const getConversationId = async (sender, receiver) => {
    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        });
        if (conversation) {
            return conversation.conversationId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving conversation ID:", error);
        return null;
    }
}

export default { createConversationId, getConversationId}