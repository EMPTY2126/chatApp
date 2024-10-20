import chatController from '../controllers/chatController.js'
import Message from '../db/models/messageModel.js'

export const socketIO = (io) => {
    const onlineUsers = {};
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        console.log(userId, ": user connected");

        socket.on('sendmessage', async (msg) => {
            const { reciver, message } = msg;
            const reciverId = onlineUsers[reciver];
            await chatController.sendMessage(userId,reciverId,message);
        });

        socket.on('disconnect', () => {
            delete onlineUsers[userId];
            console.log(userId, ": disconnected");
        });
    });
};
