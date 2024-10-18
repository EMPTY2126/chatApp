import mongoose from "mongoose";



const friendsListSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.Mixed, require:true},
    friendsList: [
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User',
        },
      ],
});

const FriendList = mongoose.model('FriendsList',friendsListSchema);

export default FriendList;
