import Message from "../db/models/messageModel.js";

const sendMessage = async (userId,reciverId,message)=>{
    if(reciverId){
        io.to(reciverId).emit('messenger',message);
    }
    let newMessage = new Message({
        sender:userId,
        reciver:reciverId,
        contend:message,
        delivered:true,
        isRead:false
    });

    await newMessage.save();
}

export default {
    sendMessage,
}


