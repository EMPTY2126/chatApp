import chatController from '../controllers/chatController.js'
import friendController from '../controllers/friendController.js';
import FriendList from '../db/models/FriendsListModel.js';

export const socketIO = (io) => {
    const onlineUsers = {};
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        onlineUsers[userId] = socket.id;

        socket.on('newconversation', async (info)=> {
            await friendController.newConversation(info.senderId,info.reciverId);
            

        });

        socket.on('sendmessage', async (msg) => {
            const { reciver, message } = msg;
            const reciverId = onlineUsers[reciver];
            let conversationId = userId+reciver;
            await chatController.sendMessage(io,conversationId,reciverId,message);
        });

        socket.on('disconnect', () => {
            delete onlineUsers[userId];
        });

    });
};
