import express, { json } from "express";
import dotenv from "dotenv";
import {createServer} from 'http';
import { Server } from 'socket.io';
import connectDB from "./db/connect.js";
import cors from 'cors'
import { router } from "./router/router.js";
import { socketIO } from "./socket/socket.js";
import cookieParser from "cookie-parser";


const app = express();
const server = createServer(app);
const io = new Server(server);
dotenv.config();

const PORT = process.env.PORT || 5000
const URI = process.env.URI


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use(cookieParser());
app.use(json());


socketIO(io);

app.use('/',router);


server.listen(PORT,connectDB(),()=>console.log(`App running on port: ${PORT}`));