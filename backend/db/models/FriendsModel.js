import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    fromUser:{type:String, require:true},
    toUser:{type:String, require:true},
    messages:{}
},{timestamps});

const Message = mongoose.model('messages',messageModel);

export default Friends;