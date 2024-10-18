import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:String,
    reciver:String,
    content:String,
    isRead:Boolean,
    delivered:Boolean,
    timestamp:{
        type:Date,
        default:Date.now() 
    }
});


const Message = mongoose.model('Messages',messageSchema);

export default Message;