import { io } from 'socket.io-client'


export const createSocket = (userId) => {
    const socket = io('http://localhost:5001', {
        query:{userId:userId,}
    });
    return socket;
}


// socket.on('connect', () => console.log("socket connected"));
// socket.on('disconnect', () => console.log("socket conn colsed"));

