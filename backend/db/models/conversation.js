import mongoose from "mongoose";

const conveSchema = new mongoose.Schema({
    conversationId :{
        type : String,
        required : true
    },
    participants :[{
        type : String
    }]
});

const Conversation = mongoose.model('Conversation',conveSchema);

export default Conversation;