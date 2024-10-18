import mongoose from "mongoose";

const friendsListSchema = new mongoose.Schema({
    id:{type:String, require:true},
    friendsList:{
        type:[String],
        default:[],
    }
});

const FriendList = mongoose.model('friendlist',friendsListSchema);

export default FriendList;