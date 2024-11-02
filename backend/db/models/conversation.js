import mongoose from "mongoose";

const conveSchema = new mongoose.Schema({
    conversationId :{
        type : String,
        required : true
    },
    participants :[{
        type : mongoose.Schema.Types.ObjectId
    }]
});

const Conversation = mongoose.model('Conversation',conveSchema);

export default Conversation;