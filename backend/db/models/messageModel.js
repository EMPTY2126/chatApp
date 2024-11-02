import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
        require:true
    },
    content:String,
    isRead:Boolean,
    delivered:Boolean,
    createdAt:{
        type:Date,
        default:Date.now() 
    }
});


const Message = mongoose.model('Messages',messageSchema);

export default Message;