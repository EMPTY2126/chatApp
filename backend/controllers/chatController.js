import Message from "../db/models/messageModel.js";

const sendMessage = async (io,conversationId,reciverId,message)=>{
    if(reciverId){
        io.to(reciverId).emit('messenger',message);
    }
    let newMessage = new Message({
        conversationId,
        contend:message,
        delivered:true,
        isRead:false
    });

    await newMessage.save();
}


export default {
    sendMessage,
}


