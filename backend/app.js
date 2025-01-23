import express, { json } from "express";
import dotenv from "dotenv";
import {createServer} from 'http';
import { Server } from 'socket.io';
import connectDB from "./db/connect.js";
import cors from 'cors'
import { router } from "./router/router.js";
import { socketIO } from "./socket/socket.js";
import cookieParser from "cookie-parser";
import {router as cryptoRouter} from "./router/cryptoRouter.js"


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', "http://localhost:4000"], 
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
dotenv.config();

const PORT = process.env.PORT || 5001
const URI = process.env.URI


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'], 
    credentials: true,
  }));

app.use(cookieParser());
app.use(json());


socketIO(io);

app.use('/api',router);
app.use('/cryptosupport',cryptoRouter)


server.listen(PORT,connectDB(),()=>console.log(`App running on port: ${PORT}`));